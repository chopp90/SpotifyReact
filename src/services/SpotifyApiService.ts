// src/services/apiService.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { SpotifyAuthService } from './SpotifyAuthService';

const baseURL = 'https://api.spotify.com/v1' // TODO: are there other versions? or can i leave v1?
//TODO: make a trim function as fallback for '/' stuff?
export class SpotifyApiService {
  private api: AxiosInstance;
  private authService= new SpotifyAuthService()
    
  constructor() {
    const accessToken = sessionStorage.getItem('accessToken')
    if(!accessToken){
      console.warn('Starting Spotify Api Service without accessToken')
    }

    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
  }

  // Fetch data from a GET request
  public async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Send data with a POST request
  public async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Update data with a PUT request
  public async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Delete data with a DELETE request
  public async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Handle errors
  private async handleError(error: any) {
    // You can log errors, send them to a logging service, etc.
    console.error('API call error:', error);
    console.error(error.status)
    if(error.status !== 401){
      return
    }
    return await this.authService.refreshToken()
  }
}
