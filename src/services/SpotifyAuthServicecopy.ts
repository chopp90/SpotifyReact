// src/services/apiService.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { spotify_API_client_id, spotify_API_client_secret } from '../data/client';

const baseURL = 'https://accounts.spotify.com'
export class SpotifyService {
  private api: AxiosInstance;
    
  constructor() {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',

      },
    });
  }  

  public async login<T>(): Promise<T> {
    return this.post('api/token', {
      'grant_type': 'client_credentials',
      'client_id': spotify_API_client_id,
      'client_secret': spotify_API_client_secret
      }
    )
  }

  // Send data with a POST request
  private async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }


  // Handle errors
  private handleError(error: any) {
    // You can log errors, send them to a logging service, etc.
    console.error('API call error:', error);
  }
}
