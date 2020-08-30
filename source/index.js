const axios = require('axios');
const config = require('config');

const fastify = require('fastify')();
import TwitchApi from './twitchApi.js';
import Storage from './db';

const redirect_uri = `${config.get("TWITCH_CLIENT_REDIR_HOST")}/auth/twitch/callback`;

const authBaseUrl = 'https://id.twitch.tv/oauth2';
const authAPI = axios.create({
  baseURL: authBaseUrl
});

const twitchApiCaller = new TwitchApi();
const db = new Storage();

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world', query }
 
}) 

fastify.get('/auth/twitch', async (req,rep)=> {
  const query = new URLSearchParams({
    client_id: config.get("TWITCH_CLIENT_ID"),
    redirect_uri,
    response_type: 'code',
    scope: req.query.scope,
    force_verify: false
  })
  const redirectUrl = `${authBaseUrl}/authorize?${query}`;
  rep.redirect(redirectUrl);
})

fastify.get('/auth/twitch/callback', async(req,rep) => {
  const { code } = req.query;
  console.log(code);
  const query = new URLSearchParams({
    client_id: config.get("TWITCH_CLIENT_ID"),
    client_secret: config.get("TWITCH_CLIENT_PASS"),
    code,
    grant_type: 'authorization_code',
    redirect_uri
  });
  try {
    const { 
      data: {access_token : token, refresh_token} 
    } = await authAPI.post(`/token?${query}`);

    console.log('Access Token : ',token, 'Refresh Token : ', refresh_token );

    const {id, login} = await twitchApiCaller.getUser({token});
      const twitchName = { login };
      const twitchId = { id }; 

      console.log('Twitch ID : ', twitchId, 'Twitch Name: ', twitchName);

    const bot = await db.botset({id}, {login}, {token },refresh_token);
      console.log(bot);
    
    return { bot };
   
 
  } catch (error) {
      console.log(error.message)
      return { error };
  }
}) 

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8888)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()