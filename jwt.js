// Info: Boilerplate library. Send Jwt using mJwt
'use strict';

// Shared Dependencies (Managed by Loader)
var Lib = {};


// Exclusive Dependencies
var CONFIG = require('./config'); // Loader can override it with Custom-Configxs

// Load External Dependencies
const jwt = require('json-web-token');
/////////////////////////// Module-Loader START ////////////////////////////////

  /********************************************************************
  Load dependencies and configurations

  @param {Set} shared_libs - Reference to libraries already loaded in memory by other modules
  @param {Set} config - Custom configuration in key-value pairs

  @return nothing
  *********************************************************************/
  const loader = function(shared_libs, config){

    // Shared Dependencies (Must be loaded in memory already)
    Lib.FormData = shared_libs.FormData;
    Lib.Utils = shared_libs.Utils;
    Lib.Debug = shared_libs.Debug;
    Lib.Instance = shared_libs.Instance;
    Lib.Time = shared_libs.Time;
    Lib.Crypto = shared_libs.Crypto;

    // Override default configuration
    if( !Lib.Utils.isNullOrUndefined(config) ){
      Object.assign(CONFIG, config); // Merge custom configuration with defaults
    }

  };

//////////////////////////// Module-Loader END /////////////////////////////////



///////////////////////////// Module Exports START /////////////////////////////
module.exports = function(shared_libs, config){

  // Run Loader
  loader(shared_libs, config);

  // Return Public Funtions of this module
  return Jwt;

};//////////////////////////// Module Exports END //////////////////////////////



///////////////////////////Public Functions START///////////////////////////////
const Jwt = { // Public functions accessible by other modules

  /********************************************************************
  Generates Web Token (Asynchronously)

  @param {reference} instance - Request Instance object reference
  @param {Function} cb - Callback function to be invoked once async execution of this function is finished

  @param {String} audience - Audience for this JWT
  @param {String} issuer - Issuer of this JWT
  @param {String} sign_in_key - Key was used to sign the JWT
  @param {String} subject - Subject of this JWT
  @param {String} signature - Signature for this JWT (to be encoded in base64)
  @param {Set} header - Header Data for this JWT (algorithm encoded header)
  @param {Set} algorithm - Header Data Algorithm for this JWT (Default 'HS256' algorithm encoded header)
  @param {Number} [expiry] - (Optional) Expiration time for this JWT (in seconds)

  @return Thru request Callback.

  @callback - For Single Receiver - Request Callback(error, token)
  * @callback {Error} error - In case of error
  * @callback {String} token - Newly Generated Web-Token
  *********************************************************************/
  generateWebToken(
    instance, cb,
    audience, issuer, sign_in_key,
    subject, signature,
    header, algorithm,
    expiry
  ){

    // Construct Payload
    const payload = {
      "aud": audience, // audience
      "iss": issuer, // issuer
      "kid": sign_in_key, // key was used to sign the JWT
      "iat": instance['time'], // issued at time (age of the JWT)
      "typ": "JWT" // type
    };


    // Add Optional Keys
    Lib.Utils.setNonEmptyKey(payload, 'sub', subject); // subject
    Lib.Utils.setNonEmptyKey(payload, 'exp', (instance['time'] + expiry)); // expiration time
    Lib.Utils.setNonEmptyKey( payload, 'header', { "algorithm": Lib.Utils.fallback(algorithm, 'HS256') } ); // Header Algorithm


    // Generate Jwt
    _Jwt.generateToken(
      cb,
      header,
      payload,
      signature
    );

  },

};///////////////////////////Public Functions END//////////////////////////////



//////////////////////////Private Functions START//////////////////////////////
const _Jwt = { // Private functions accessible within this modules only

  /********************************************************************
  Generate a JSON Web Token
  (Ref: https://www.npmjs.com/package/json-web-token)

  @param {Function} cb - Callback function to be invoked once async execution of this function is finished

  @param {Set} header - JWT Header Data
  @param {Set} payload - JWT Payload Data
  @param {String} signature - Signing Secret (To be used as base64 encoded)

  @callback - For Single Receiver - Request Callback(error, token)
  * @callback {Error} error - In case of error
  * @callback {String} token - Newly Generated Web-Token
  *********************************************************************/
  generateToken(cb, header, payload, signature){

    // Override
    payload['header'] = Lib.Utils.overrideObject(payload['header'], header)

    // Base64 Encoded Secret Buffer Data
    const secret = Buffer.from(signature, 'base64');


    // Generate JWT
    jwt.encode(
      secret,
      payload,
      function (err, token) { // Callback

        if(err){ // Print Error
          return cb(err); // Invoke callback with error
        }


        // Success

        // Return Token
        return cb(null, token)

    }
    );

  },

};//////////////////////////Private Functions END//////////////////////////////
