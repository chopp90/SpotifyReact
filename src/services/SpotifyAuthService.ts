import axios, { AxiosInstance, AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000'
export class SpotifyAuthService {
  private api: AxiosInstance
    
  constructor() {
    this.api = axios.create({
      baseURL: baseURL,
    })
  }  

  // CORS error like this, using hyperlink to BE now, TODO: maybe test again with new server cors setting
  // public async authenticate<T>(): Promise<T> {
  //   return this.get('/authenticate')    
  // }

  public async getToken<T>(code: string): Promise<T> {
    return this.get('/get-token', {      
      code: code,
    })
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

  // Handle errors
  private handleError(error: any) {
    // You can log errors, send them to a logging service, etc.
    console.error('Auth-API call error:', error);
  }
}
