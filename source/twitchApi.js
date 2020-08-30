const axios = require('axios');
const config = require('config');

const helixBaseUrl = 'https://api.twitch.tv/helix'; 
const helix = axios.create({
  baseURL: helixBaseUrl
});

export default class TwitchApi{
  constructor(){
  }
  async getUser({token} = {}){
      const {data: { data }} = await helix.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': config.get("TWITCH_CLIENT_ID")
      }
    });  
    return data[0] || null;
  }

  async getUsers({token} = {}){
    const {data: { data }} = await helix.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-ID': config.get("TWITCH_CLIENT_ID")
    }
  });  
  return data[0] || null;

}
}