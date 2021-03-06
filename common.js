/*
   Copyright 2011 David Plumpton

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var storage = 'brown.data';

function getSites()
{
    try {
        return JSON.parse(localStorage[storage]);
    } catch (e) {
        return [];
    }
}

function storeSites(sites)
{
    localStorage[storage] = JSON.stringify(sites);
}

function compareSite(s1, s2) {
    if (s1.nextTime < s2.nextTime) return -1;
    if (s1.nextTime > s2.nextTime) return 1;
    return 0;
}

function getDelay(site) {
    var frequency = site.frequency;
    var amount = parseInt(frequency.substring(0, frequency.length - 1));
    var period = frequency.substring(frequency.length - 1);
    if (period == 'd') {
        return amount * 24 * 60 * 60 * 1000;
    }
    if (period == 'h') {
        return amount * 60 * 60 * 1000;
    }
    if (period == 'w') {
        return amount * 7 * 24 * 60 * 60 * 1000;
    }
    alert('Bad frequency value: ' + frequency);
}

