export function Domo() {}

Domo.post = function (url, body, options) {
  return domoHttp('POST', url, options, true, body);
};

Domo.put = function (url, body, options) {
  return domoHttp('PUT', url, options, true, body);
};

Domo.get = function (url, options) {
  return domoHttp('GET', url, options);
};

Domo.delete = function (url, options) {
  return domoHttp('DELETE', url, options);
};

function domoHttp(method, url, options, async, body) {
  options = options || {};

  // Return a new promise.
  return new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    if (async) {
      req.open(method, url, async);
    } else {
      req.open(method, url);
    }
    setFormatHeaders(req, url, options);
    setContentHeaders(req, options);
    setResponseType(req, options);

    req.onload = function () {
      var data;
      // This is called even on 404 etc so check the status
      if (isSuccess(req.status)) {
        if (['csv', 'excel'].includes(options.format) || !req.response) {
          resolve(req.response);
        }
        if (options.responseType === 'blob') {
          resolve(
            new Blob([req.response], {
              type: req.getResponseHeader('content-type'),
            })
          );
        }

        let responseStr = req.response;
        try {
          // if(!responseStr) {
          //   responseStr = "{}";
          // }
          data = JSON.parse(responseStr);
        } catch (ex) {
          reject(Error('Invalid JSON response'));
          return;
        }
        // Resolve the promise with the response text
        resolve(data);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function () {
      reject(Error('Network Error'));
    };

    // Make the request
    if (body) {
      if (!options.contentType || options.contentType === 'application/json') {
        var json = JSON.stringify(body);
        // Make the request
        req.send(json);
      } else {
        req.send(body);
      }
    } else {
      req.send();
    }
  });
}

Domo.getAll = function (urls, options) {
  return Promise.all(
    urls.map(function (url) {
      return Domo.get(url, options);
    })
  );
};

/**
 * Let the domoapp optionally handle its own data updates.
 */
Domo.onDataUpdate = function (cb) {
  window.addEventListener('message', function (event) {
    if (!isVerifiedOrigin(event.origin)) return;

    if (typeof event.data === 'string' && event.data.length > 0) {
      try {
        var message = JSON.parse(event.data);
        if (!message.hasOwnProperty('alias')) {
          return;
        }

        var alias = message.alias;

        // send acknowledgement to prevent autorefresh
        var ack = JSON.stringify({
          event: 'ack',
          alias: alias,
        });
        event.source.postMessage(ack, event.origin);

        // inform domo app which alias has been updated
        cb(alias);
      } catch (err) {
        var info =
          'There was an error in Domo.onDataUpdate! It may be that our event listener caught ' +
          'a message from another source and tried to parse it, so your update still may have worked. ' +
          'If you would like more info, here is the error: \n';
        console.warn(info, err);
      }
    }
  });
};

/**
 * Request a navigation change
 */
Domo.navigate = function (url, isNewWindow) {
  var message = JSON.stringify({
    event: 'navigate',
    url: url,
    isNewWindow: isNewWindow,
  });
  window.parent.postMessage(message, '*');
};

/**
 * Post a filter to the parent page/dashboard
 * @param {String} column
 * @param {String} operator
 * @param {Array} values
 */
Domo.filterContainer = function (column, operator, values, dataType) {
  var userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent);

  var message = JSON.stringify({
    event: 'filter',
    filter: {
      columnName: column,
      operator: operator,
      values: values,
      dataType: dataType,
    },
  });

  if (ios && !safari) {
    window.webkit.messageHandlers.domofilter.postMessage({
      column: column,
      operand: operator,
      values: values,
      dataType: dataType,
    });
  } else {
    window.parent.postMessage(message, '*');
  }
};

Domo.env = getQueryParams();

Domo.__util = {
  isVerifiedOrigin,
  getQueryParams,
  setFormatHeaders,
  isSuccess,
};

function isSuccess(status) {
  return status >= 200 && status < 300;
}

function isVerifiedOrigin(origin) {
  var whitelisted = origin.match(
    '^https?://([^/]+[.])?(domo|domotech|domorig).(com|io)?(/.*)?$'
  );
  var blacklisted = origin.match('(.*).(domoapps).(.*)');
  return !!whitelisted && !blacklisted;
}

function getQueryParams() {
  var query = window.location.search.substr(1);
  var result = {};
  query.split('&').forEach(function (part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

function setFormatHeaders(req, url, options) {
  if (url.indexOf('data/v1') === -1) {
    return;
  }

  // set format
  var formatTypes = {
    'array-of-arrays': 'application/json',
    csv: 'text/csv',
    excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  req.setRequestHeader(
    'Accept',
    options.format
      ? formatTypes[options.format] || 'application/array-of-objects'
      : 'application/array-of-objects'
  );
}

function setContentHeaders(req, options) {
  if (options.contentType) {
    // set content type if user passed option
    if (options.contentType !== 'multipart') {
      req.setRequestHeader('Content-Type', options.contentType);
    }
  } else {
    req.setRequestHeader('Content-Type', 'application/json');
  }
}

function setResponseType(req, options) {
  //set response type if user passed option
  if (options.responseType) {
    req.responseType = options.responseType;
  }
}
