import _pick from 'lodash/pick';
import moment from 'moment';
import db from '../db';



// helpers
import { respondWithWarning, respondWithSuccess } from '../helpers/httpResponse';
import { encryptPassword } from '../helpers/passwordEncryption';
import generateJwtToken from '../helpers/generateJwtToken';
import logger from '../helpers/logger';

async function Signup(req, res) {
  const pinToken = encryptPassword((Math.random() * 1000000000).toFixed(0));
  const {
    email, password, phone, fullName, pushToken, deviceId, dob,
  } = req.body;

  try {
    if (moment.duration(moment().diff(dob)).asYears() < 20) {
      return respondWithWarning(res, 409, 'Signup is not allowed. Requirements not met.');
    }

    const newUser = await db.user.findOrCreate({
      where: { email } && {phone},
      defaults: {
        email,
        password: encryptPassword(password),
        resetToken: pinToken,
        phone,
        fullName,
        pushToken,
        deviceId,
        dob,
      },
    }).spread((user, created) => {
      if (!created) {
        return null;
      }
      return user;
    });

    if (!newUser) {
      return respondWithWarning(res, 409, 'Email or Phone Number already in use');
    }
    const user = _pick(newUser.toJSON(), ['id', 'email', 'fullName']);
    const userExtras = newUser.toJSON();

    const userPayload = _pick(newUser.toJSON(), ['id', 'fullName']);
    const authtoken = generateJwtToken(userPayload);


    return respondWithSuccess(res, 201, 'Registration successful, check your mail for a verification link to complete the Registration process',
      {
        ...user, token: authtoken, isVerified: false, pinToken,
      });
  } catch (error) {
    logger.error({
      message: 'Registration not successful',
      error,
    });
    return respondWithWarning(res, 500, 'Registration not successful');
  }
}

export default Signup;
