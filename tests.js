/**
 * YES.com Node.JS Javascript API library tests
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

var yes = require('./api')
  , assert = require('assert');

//version 1 tests require version 1 api
assert(yes && yes.v1, 'Error: YES API v1 is NOT present in the module for the test.');

var tests = [];
function testAPI (functionName, functionArgs, testCallback) {
  yes.v1[functionName](functionArgs, function cb(data, error) {
    var test = {
          'functionName': functionName
        , 'functionArgs': functionArgs
        , 'response': {
            'data': data
          , 'error': error
        }
      };
    tests[tests.length] = test;
    if (testCallback) testCallback(test);
  });
}

function generalAssertions(test) {
  assert(test, 'Test data is not available.');
  assert(test.response, 'Server response is not available.');
  assert.ifError(test.response.err, 'Server response error is available. Response details: ' + test.response.err);
  assert(test.response.data, 'Server response data is not available.');
  if (test.response.data.err)
    console.log('[warn] yes.v1.' + test.functionName + '(', test.functionArgs, ') YES API error: ' + test.response.data.err);
}

function songsAssertions(test) {
  assert(test.response.data.songs, 'Did not receive song log.');
  if (test.response.data.songs.length == 0)
    console.log('[warn] Song log is empty.');
}

function stationAssertions(test) {
  assert(test.response.data.name, 'Server did not respond with station call name.');
  assert(test.response.data.name == 'WFNX', 'Unexpected station call name.');
}

function stationsAssertions(test) {
  assert(test.response.data.stations, 'Did not receive station list.');
}

function passed(test) {
  console.log('[pass] yes.v1.' + test.functionName + '(', test.functionArgs, ').');
}

//station()
testAPI('station', { name: 'WFNX' }, function (test) {
  generalAssertions(test);
  stationAssertions(test);
  passed(test);
});

//stations()
testAPI('stations', { match: 'rock' }, function (test) {
  generalAssertions(test);
  stationsAssertions(test);
  passed(test);
});
testAPI('stations', { loc: 80202, genre: 'country' }, function (test) {
  generalAssertions(test);
  stationsAssertions(test);
  passed(test);
});
testAPI('stations', { genre: 'rock', mid: 10956639 }, function (test) {
  generalAssertions(test);
  stationsAssertions(test);
  passed(test);
});

//log()
testAPI('log', { name: 'KEXP' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});
testAPI('log', { name: 'WFNX', ago: 1 }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});

//recent()
testAPI('recent', { name: 'KEXP' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});
testAPI('recent', { name: 'WFNX' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});

//chart()
testAPI('chart', { name: 'WFNX' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});
testAPI('chart', { genre: 'Rock' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});
testAPI('chart', { genre: 'Jazz', hot: 'fresh' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});
testAPI('chart', { name: 'KEXP', date: '2008-08-08', genre: 'Punk' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});

//media()
testAPI('media', { q: 'distur' }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});
testAPI('media', { aid: 10657 }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});
testAPI('media', { mid: 12812281 }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});

testAPI('related', { mid: 12812281 }, function (test) {
  generalAssertions(test);
  songsAssertions(test);
  passed(test);
});

process.on('exit', function () {
  console.log('All API tests passed.');
});