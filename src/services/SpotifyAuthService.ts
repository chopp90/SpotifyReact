import axios, { AxiosInstance, AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000'
export class SpotifyAuthService {
  private api: AxiosInstance
  private clientId=  import.meta.env.VITE_CLIENT_ID || ''
  private redirectUri = 'http://localhost:5173/callback'  

  constructor() {
    this.api = axios.create({
      baseURL: baseURL,
    })
  }  

  private generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "")
  }
  
  private sha256 = async (plain: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
  private base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

public async authPKCE() {

  const codeVerifier  = this.generateRandomString(64)
  const hashed = await this.sha256(codeVerifier)
  const codeChallenge = this.base64encode(hashed)
  
  
  const scope = 'user-read-private user-read-email playlist-read-private user-top-read playlist-modify-public playlist-modify-private user-modify-playback-state';
  const authUrl = new URL("https://accounts.spotify.com/authorize")
  
  // generated in the previous step
  window.localStorage.setItem('code_verifier', codeVerifier);
  
  const params =  {
    response_type: 'code',
    client_id: this.clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: this.redirectUri,
  }
  
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

  public async getToken<T>(code: string): Promise<T> {
    // try {
    const codeVerifier = window.localStorage.getItem('code_verifier',);

      const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri,      
        client_id: this.clientId,
        code_verifier: codeVerifier
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log("returning data",response.data)
      return response.data
    // } catch (error) {
    //   console.error(error.response.data)
    //   res.status(500).send('Error exchanging code for token');
    // }
  }



  // CORS error like this, using hyperlink to BE now, TODO: maybe test again with new server cors setting
  // public async authenticate<T>(): Promise<T> {
  //   return this.get('/authenticate')    
  // }

  // Old server-auth way
  // public async getToken<T>(code: string): Promise<T> {
  //   return this.get('/get-token', {      
  //     code: code,
  //   })
  // }

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
