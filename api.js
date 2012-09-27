/**
 * YES.com Node.JS Javascript API library
 *
 * Portions of documentation (c) 2008 YES.com. All rights reserved. Reprinted
 * for your convenience only. Source: http://api.yes.com/
 *
 * Copyright (c) 2012, David Ball <http://daball.me/>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  o Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  o Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *  o Neither the name of the David Ball nor the names of its contributors may
 *    be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 **/

var http = require('http')
 ,  querystring = require('querystring');

/**
 * v1(apicall, parameters, cb)
 *
 * Runs any version 1 yes.com API request. The basic URL for any api call is:
 * http://api.yes.com/{version}/{apicall}?{parameters}
 *
 * Parameters:
 *  apicall: One of the various API calls described below.
 *  params: JSON object with query parameters. Each call has different parameters.
 *  cb: Callback function when complete.
 *
 * Callback implements characteristics of the http.ClientRequest.
 *  function (data, err) { }, etc.
 **/
function v1(apicall, params, cb) {
  //short circuit
  if (!apicall) return;
  //fix missing inputs
  if (!params) params = {};
  if (!cb) cb = function () {};
  //stringify params
  var p = querystring.stringify(params);
  if (p != '') p = '?' + p;
  //options
  var o = {
      host: 'api.yes.com'
    , port: 80
    , path: '/1/'  + apicall + p
  };
  //log output
  //console.log('[node-yesapi] Downloading from http://' + o.host + o.path);
  //request url
  http.get(o, function(res) {
    //log output
    //console.log('[node-yesapi]', 'Server responded with status', res.statusCode);
    //console.log('[node-yesapi]', 'Server headers: ' + JSON.stringify(res.headers));
    //store data
    var message = '';
    var error = undefined;
    res.on('data', function (chunk) {
        if (res.statusCode == 200)
          message += chunk;
        else
        {
          //console.log('[node-yesapi]', "Message chunk:", chunk);
          //send error to callback
          cb(undefined, chunk);
        }
    }).on('close', function (err) {
      //console.warn('[node-yesapi]', "Server responded with error:", e.message);
      //send error to callback
      cb({'err': e});
    }).on('end', function () {
      var obj = JSON.parse(message);
      //if (r.err)
        //console.warn('[node-yesapi]', "YES.com API error:", r.err);
      //console.log('[node-yesapi] Returned object ', r);
      //send response JSON object to callback
      //build paramater input for callback
      var inParams = arguments;
      cb(obj);
    });
  });
}

module.exports =
{
  'v1': {
  
      /**
       * station(object, cb)
       *
       * Get current information about a single station including now playing
       * song, slogan, frequency, market, and links to any known webcast stream
       * or site.
       *
       * Parameters:
       *  params: JSON object with query parameters
       *  cb: Callback function when complete.
       *
       * JSON Input Format:
       *  {
       *    name: The station name (for AM/FM it is just the call letters). 
       *  }
       *
       * Callback should look like:
       *  function (data) { }
       **/
      'station': function (params, cb) {
        return v1('station', params, cb);
      }
    
      /**
       * stations(object, cb)
       *
       * Search and find a list of stations by name, frequency, genre, artist,
       * or location. 
       *
       * Parameters:
       *  params: JSON object with query parameters
       *  cb: Callback function when complete.
       *
       * JSON Input Format:
       *  {
       *      match: [optional] Used to search station names, call letters,
       *             slogans, frequency, or cities/states.
       *
       *    , freq:  [optional] Also match an exact AM/FM frequency.
       *
       *    , mid:   [optional] Also match only stations that have this media id
       *             (see media call) in their top 100 charts.
       *    , genre: [optional] Also match any genre keywords like pop, rock, etc.
       *    , loc:   [optional] Also match stations within 60 miles of the given
       *             zip code, "lat,lon", or city/state names.
       *    , max:   [optional] Defaults to 10 stations returned.
       *  }
       *
       * Callback should look like:
       *  function (data) { }
       **/
    , 'stations': function (params, cb) {
        return v1('stations', params, cb);
      }
      
      /**
       * log(object, cb)
       *
       * Get the log of all the songs played on the given station in a selected
       * day within the last week. 
       *
       * Parameters:
       *  params: JSON object with query parameters
       *  cb: Callback function when complete.
       *
       * JSON Input Format:
       *  {
       *      name: The station name. 
       *    , ago:  [optional] The days ago from now for the given date you want,
       *            an integer from 0-6 and defaults to 0 (the log today so far).
       *  }
       *
       * Callback should look like:
       *  function (data) { }
       **/
    , 'log': function (params, cb) {
        return v1('log', params, cb);
      }
      
      /**
       * recent(object, cb)
       *
       * Get the most recent songs played on any station. 
       *
       * Parameters:
       *  params: JSON object with query parameters
       *  cb: Callback function when complete.
       *
       * JSON Input Format:
       *  {
       *      name: The station name. 
       *    , max:  How many recent songs to return (default is 10).
       *  }
       *
       * Callback should look like:
       *  function (data) { }
       **/
    , 'recent': function (params, cb) {
        return v1('recent', params, cb);
      }
      
      /**
       * chart(object, cb)
       *
       * Get the current top 100 songs for any station based on number of times
       * played and user voting (calculated daily). 
       *
       * Parameters:
       *  params: JSON object with query parameters
       *  cb: Callback function when complete.
       *
       * JSON Input Format:
       *  {
       *      name:  [optional] The station name, defaults to US national top
       *             100 if none given.
       *    , date:  [optional] Return just the charts from a specific date in
       *             the format year-mm-dd (April 2008 and newer).
       *    , genre: [optional] Filter any request to a specific Genre
       *             (Americana, Blues, Christian, Classical, Country,
       *             Electronica, Hip-Hop, Jazz, Latin, Metal, New Age, Pop,
       *             Punk, R&B/Soul, Rock, Smooth, Jazz, World).
       *    , hot:   [optional] Alternative sorting, must be either "fresh" (by
       *             most increase in charts day-to-day, not supported in
       *             combination with date field) or "vote" (most votes via
       *             yes.com).
       *    , max:   How many recent songs to return (default is 10).
       *  }
       *
       * Callback should look like:
       *  function (data) { }
       **/
    , 'chart': function (params, cb) {
        return v1('chart', params, cb);
      }

     /**
       * media(object, cb)
       *
       * Get a list of any matching artist names or song titles based on airtime
       * popularity. 
       *
       * Parameters:
       *  params: JSON object with query parameters
       *  cb: Callback function when complete.
       *
       * JSON Input Format:
       *  {
       *      q:   The string to search with, can be partial (used for
       *           autocomplete) or full names.
       *    , aid: [optional] Instead of a general query, a known Artist ID can
       *           be passed to return just media from that artist.
       *    , mid: [optional] Instead of a general query, a known Media ID can
       *           be passed to return extra information (lyrics from Lyric Wiki
       *           and matching videos from YouTube and MTV) about just that song.
       *    , max: How many songs to return (default is 10, max is 50).
       *  }
       *
       * Callback should look like:
       *  function (data) { }
       **/
    , 'media': function (params, cb) {
        return v1('media', params, cb);
      }
      
     /**
       * related(object, cb)
       *
       * Given a song, return a list of related songs based on airtime in the
       * last week. 
       *
       * Parameters:
       *  params: JSON object with query parameters
       *  cb: Callback function when complete.
       *
       * JSON Input Format:
       *  {
       *      mid: The media ID (use media call to search for IDs).
       *    , max:   How many recent songs to return (default is 10).
       *  }
       *
       * Callback should look like:
       *  function (data) { }
       **/
    , 'related': function (params, cb) {
        return v1('related', params, cb);
      }
  }
};
