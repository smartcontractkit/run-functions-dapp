export const CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title Chainlink Functions example consuming weather data
 */
contract WeatherConsumer is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;

  string private constant SOURCE = "const lat = args[0]; const long = args[1]; const weatherResponse = await Functions.makeHttpRequest({url: \`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${long}&current=temperature_2m\`}); if(weatherResponse.error) { throw Error('Weather API Error'); } const currentTemperature = weatherResponse.data.current['temperature_2m']; if(!currentTemperature) { throw Error('Weather API did not return temperature'); } return Functions.encodeString(currentTemperature);";

  bytes32 public donId; // DON ID for the Functions DON to which the requests are sent
  uint64 private subscriptionId; // Subscription ID for the Chainlink Functions
  uint32 private gasLimit; // Gas limit for the Chainlink Functions callbacks

  // Mapping of request IDs to weather info
  mapping(bytes32 => WeatherInfo) public requests;

  struct WeatherInfo {
    string lat; // Location latitude
    string long; // Location longitude
    string temperature; // Temperature at the location in degrees Celsius
    uint64 timestamp; // Timestamp of the temperature reading
  }

  event WeatherInfoRequested(bytes32 indexed requestId, string lat, string long);
  event WeatherInfoReceived(bytes32 indexed requestId, string temperature, uint64 timestamp);
  event RequestFailed(bytes error);

  constructor(
    address router,
    bytes32 _donId,
    uint64 _subscriptionId,
    uint32 _gasLimit
  ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
    donId = _donId;
    subscriptionId = _subscriptionId;
    gasLimit = _gasLimit;
  }

  /**
   * @notice Request weather info for a location
   * @param lat Latitude of the location
   * @param long Longitude of the location
   */
  function requestWeatherInfo(string calldata lat, string calldata long) external {
    string[] memory args = new string[](2);
    args[0] = lat;
    args[1] = long;
    bytes32 requestId = _sendRequest(args);

    requests[requestId] = WeatherInfo({lat: lat, long: long, temperature: "", timestamp: 0});
    emit WeatherInfoRequested(requestId, lat, long);
  }

  /**
   * @notice Process the response from the executed Chainlink Functions script
   * @param requestId The request ID
   * @param response The response from the Chainlink Functions script
   */
  function _processResponse(bytes32 requestId, bytes memory response) private {
    string memory temperature = string(response);
    uint64 timestamp = uint64(block.timestamp);

    requests[requestId].temperature = temperature;
    requests[requestId].timestamp = timestamp;
    emit WeatherInfoReceived(requestId, temperature, timestamp);
  }

  // CHAINLINK FUNCTIONS

  /**
   * @notice Triggers an on-demand Functions request
   * @param args String arguments passed into the source code and accessible via the global variable \`args\`
   */
  function _sendRequest(string[] memory args) internal returns (bytes32 requestId) {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, SOURCE);
    if (args.length > 0) {
      req.setArgs(args);
    }
    requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donId);
  }

  /**
   * @notice Fulfillment callback function
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    if (err.length > 0) {
      emit RequestFailed(err);
      return;
    }
    _processResponse(requestId, response);
  }

  // OWNER

  /**
   * @notice Set the DON ID
   * @param newDonId New DON ID
   */
  function setDonId(bytes32 newDonId) external onlyOwner {
    donId = newDonId;
  }
}
`

export const TABS = [
  {
    label: 'Library Imports and Contract Inheritance',
    content:
      'This is where we tell our smart contract that we want to use Chainlink Functions.',
    highlightedLines: Array.from({ length: 9 }, (v, k) => 4 + k),
  },
  {
    label: 'JavaScript Source',
    content:
      'This is where the JavaScript code that Chainlink Functions will execute is stored. By storing it on-chain, we have guarantees that this and only this code will be executed.',
    highlightedLines: [14],
  },
  {
    label: 'Subscription ID',
    content:
      'This is where the Chainlink Functions <a class="explainer-link" href="https://docs.chain.link/chainlink-functions/resources/subscriptions">subscription ID</a> is stored. This is required for your smart contract to use Chainlink Functions.',
    highlightedLines: [17],
  },
  {
    label: 'Functions Initialization',
    content:
      'In this contract\'s constructor, we set some Chainlink Functions specific configuration values such as the <a class="explainer-link" href="https://docs.chain.link/chainlink-functions/supported-networks">DON ID</a>, Functions <a class="explainer-link" href="https://docs.chain.link/chainlink-functions/resources/subscriptions">subscription ID</a> and gas limit for the callback transaction.',
    highlightedLines: Array.from({ length: 4 }, (v, k) => 39 + k),
  },
  {
    label: 'Functions Request',
    content:
      'This is the function called by the UI when a new request is initiated. It sends the request to the Chainlink Functions DoN, along with all associated parameters, such as the JavaScript code to execute, subscription ID, gas limit for the callback transaction, and DoN ID of the Chainlink Functions network we wish to execute the code on.',
    highlightedLines: Array.from({ length: 8 }, (v, k) => 80 + k),
  },
  {
    label: 'Functions Response',
    content:
      'This is the function called by the Chainlink Functions DoN when it receives a response from the JavaScript code executed off-chain in the Chainlink Function.',
    highlightedLines: Array.from({ length: 7 }, (v, k) => 96 + k),
  },
]
