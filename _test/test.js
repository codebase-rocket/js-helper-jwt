// Info: Test Cases
'use strict';

// Shared Dependencies
var Lib = {};

// Set Configrations
const http_config = {
   'TIMEOUT': 30000, // In milliseconds (140 second). 0 means no timeout
   'USER_AGENT': 'Test App 1.0' // Not used by browser
};


// Dependencies
Lib.Utils = require('js-helper-utils');
Lib.Debug = require('js-helper-debug')(Lib);
Lib.Instance = require('js-helper-instance')(Lib);
[Lib.Time, Lib.TimeInput, Lib.TimeData] = require('js-helper-time')(Lib);
Lib.Crypto = require('js-helper-crypto-nodejs')(Lib);

const Jwt = require('js-helper-jwt')(Lib);

////////////////////////////SIMILUTATIONS//////////////////////////////////////

function test_output(resp, resp1, resp2, resp3, resp4, resp5){ // Result are from previous function

  Lib.Debug.log('resp', resp);
  Lib.Debug.log('resp1', resp1);
  Lib.Debug.log('resp2', resp2);
  Lib.Debug.log('resp3', resp3);
  Lib.Debug.log('resp4', resp4);
  Lib.Debug.log('resp5', resp5);

};

function test_output2(error, status_code, request_id, delivery_failure_code, resp4, resp5){ // Result are from previous function

  Lib.Debug.log('error', error);
  Lib.Debug.log('status_code', status_code);
  Lib.Debug.log('request_id', request_id);
  Lib.Debug.log('delivery_failure_code', delivery_failure_code);
};


function test_output_simple(err, response){ // Result are from previous function

  if(err){
    Lib.Debug.logErrorForResearch(err);
  }

  console.log('response', response);

};

///////////////////////////////////////////////////////////////////////////////


/////////////////////////////STAGE SETUP///////////////////////////////////////

// Initialize 'instance'
var instance = Lib.Instance.initialize();

// Web-Token sample Data
var developer_id = "todo";
var key_id = "todo";
var signing_secret = "todo";

// sample header
// var header_data = { "algorithm": 'HS256', "dd-ver": 'DD-JWT-V1' };
var header_data =  { "dd-ver": "DD-JWT-V1" };
///////////////////////////////////////////////////////////////////////////////


/////////////////////////////////TESTS/////////////////////////////////////////

// Generate JWT
Jwt.generateWebToken(
  instance, test_output_simple,
  'doordash', // audience,
  developer_id, // issuer,
  key_id, // sign_in_key,
  null, // subject,
  signing_secret, // signature,
  header_data, // header,
  null, // algorithm
  1800 // expiry
);

///////////////////////////////////////////////////////////////////////////////
