import axios from 'axios';

// Pulled from the decompiled apk of the owlet app
const OWLET_APP_ID = 'sso-prod-3g-id';
const OWLET_APP_SECRET = 'sso-prod-UEjtnPCtFfjdwIwxqnC0OipxRFU';

const login = async (): Promise<string> => {
  const googleIdToken = await googleLogin(
    process.env.OWLET_EMAIL,
    process.env.OWLET_PASSWORD
  );
  const miniToken = await getMiniToken(googleIdToken);
  const authToken = await aylaLogin(miniToken);
  return authToken;
};

const googleLogin = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCsDZ8kWxQuLJAMVnmEhEkayH1TSxKXfGA`;
    const result = await axios.post(
      url,
      {
        email,
        password,
        returnSecureToken: true,
      },
      {
        headers: {
          'X-Android-Package': 'com.owletcare.owletcare',
          'X-Android-Cert': '2A3BC26DB0B8B0792DBE28E6FFDC2598F9B12B74',
        },
      }
    );
    return result.data.idToken;
  } catch (err) {
    throw `Failed to sign into google ${err.response.data}`;
  }
};

const getMiniToken = async (googleIdToken: string): Promise<string> => {
  try {
    const url = `https://ayla-sso.owletdata.com/mini/`;
    const result = await axios.get(url, {
      headers: { Authorization: googleIdToken },
    });
    return result.data.mini_token;
  } catch (err) {
    throw `Failed to get mini token ${err}`;
  }
};

const aylaLogin = async (miniToken: string): Promise<string> => {
  try {
    const url = `https://user-field-1a2039d9.aylanetworks.com/api/v1/token_sign_in`;
    const result = await axios.post(
      url,
      {
        app_id: OWLET_APP_ID,
        app_secret: OWLET_APP_SECRET,
        provider: 'owl_id',
        token: miniToken,
        email: process.env.OWLET_EMAIL,
        password: process.env.OWLET_PASSWORD,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return result.data.access_token;
  } catch (err) {
    console.log(err);
    throw `Failed to sign into ayla ${err}`;
  }
};
export default login;
