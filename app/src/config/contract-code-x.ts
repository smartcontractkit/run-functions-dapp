// Warning: Do not copy/paste this code
// Please refer to the supplied example code in the
// repository instead.
// The code here has been slightly changed to escape
// special characters in order to be displayed on the
// web-page.
export const CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title Chainlink Functions example consuming weather data
 */
contract XUserDataConsumer is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;

  enum ResponseType {
    UserInfo,
    UserLastTweet
  }

  struct APIResponse {
    ResponseType responseType;
    string response;
  }

  // Chainlink Functions script soruce code
  string private constant SOURCE_USERNAME_INFO =
    "const username = args[0];"
    "if(!secrets.xBearerToken) {"
    "throw Error('No bearer token');"
    "}"
    "const xUserResponse = await Functions.makeHttpRequest({"
    "url: \`https://api.twitter.com/2/users/by/username/\${username}?user.fields=profile_image_url\`,"
    "headers: { Authorization: \`Bearer \${secrets.xBearerToken}\` },"
    "});"
    "if (xUserResponse.error) {"
    "throw Error(\`X User Request Error\`);"
    "}"
    "const { name, id } = xUserResponse.data.data;"
    "return Functions.encodeString([name, id]);";

  string private constant SOURCE_LAST_TWEET_INFO =
    "const id = args[0];"
    "if (!secrets.xBearerToken) {"
    "throw Error('No bearer token');"
    "}"
    "const xTweetsResponse = await Functions.makeHttpRequest({"
    "url: \`https://api.twitter.com/2/users/\${id}/tweets\`,"
    "headers: { Authorization: \`Bearer \${secrets.xBearerToken}\` },"
    "});"
    "if (xTweetsResponse.error) {"
    "throw Error('X User Request Error');"
    "}"
    "const lastTweet = xTweetsResponse.data.data[0].text;"
    "const shortenedTweet = lastTweet.substring(0, 255);"
    "return Functions.encodeString(shortenedTweet);";

  bytes32 public donId; // DON ID for the Functions DON to which the requests are sent
  uint64 private subscriptionId; // Subscription ID for the Chainlink Functions
  uint32 private gasLimit; // Gas limit for the Chainlink Functions callbacks

  // Mapping of request IDs to weather info
  mapping(bytes32 => APIResponse) public requests;

  event UserInfoRequested(bytes32 indexed requestId, string username);
  event UserInfoReceived(bytes32 indexed requestId, string response);
  event UserLastTweetRequested(bytes32 indexed requestId, string username);
  event UserLastTweetReceived(bytes32 indexed requestId, string response);
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
   * @notice Request X profile information for provided handle
   * @param username username of said user e.g. chainlink
   * @param slotId the location of the DON-hosted secrets
   * @param version the version of the secret to be used
   */
  function requestUserInfo(string calldata username, uint8 slotId, uint64 version) external {
    string[] memory args = new string[](1);
    args[0] = username;
    bytes32 requestId = _sendRequest(SOURCE_USERNAME_INFO, args, slotId, version);

    requests[requestId].responseType = ResponseType.UserInfo;
    emit UserInfoRequested(requestId, username);
  }

  /**
   * @notice Request last post for given username
   * @param userId username of said user e.g. chainlink
   * @param slotId the location of the DON-hosted secrets
   * @param version the version of the secret to be used
   */
  function requestLastTweet(string calldata userId, uint8 slotId, uint64 version) external {
    string[] memory args = new string[](1);
    args[0] = userId;
    bytes32 requestId = _sendRequest(SOURCE_LAST_TWEET_INFO, args, slotId, version);

    requests[requestId].responseType = ResponseType.UserLastTweet;
    emit UserLastTweetRequested(requestId, userId);
  }

  /**
   * @notice Process the response from the executed Chainlink Functions script
   * @param requestId The request ID
   * @param response The response from the Chainlink Functions script
   */
  function _processResponse(bytes32 requestId, bytes memory response) private {
    requests[requestId].response = string(response);
    if (requests[requestId].responseType == ResponseType.UserInfo) {
      emit UserInfoReceived(requestId, string(response));
    } else {
      emit UserLastTweetReceived(requestId, string(response));
    }
  }

  // CHAINLINK FUNCTIONS

  /**
   * @notice Triggers an on-demand Functions request
   * @param args String arguments passed into the source code and accessible via the global variable \`args\`
   * @param slotId the location of the DON-hosted secrets
   * @param version the version of the secret to be used
   */
  function _sendRequest(
    string memory source,
    string[] memory args,
    uint8 slotId,
    uint64 version
  ) internal returns (bytes32 requestId) {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
    req.addDONHostedSecrets(slotId, version);
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
    highlightedLines: Array.from({ length: 31 }, (v, k) => 24 + k),
  },
  {
    label: 'Subscription ID',
    content:
      'This is where the Chainlink Functions <a class="explainer-link" href="https://docs.chain.link/chainlink-functions/resources/subscriptions">subscription ID</a> is stored. This is required for your smart contract to use Chainlink Functions.',
    highlightedLines: [57],
  },
  {
    label: 'Functions Initialization',
    content:
      'In this contract\'s constructor, we set some Chainlink Functions specific configuration values such as the <a class="explainer-link" href="https://docs.chain.link/chainlink-functions/supported-networks">DON ID</a>, Functions <a class="explainer-link" href="https://docs.chain.link/chainlink-functions/resources/subscriptions">subscription ID</a> and gas limit for the callback transaction.',
    highlightedLines: Array.from({ length: 4 }, (v, k) => 74 + k),
  },
  {
    label: 'Functions Request',
    content:
      'This is the function called by the UI when a new request is initiated. It sends the request to the Chainlink Functions DoN, along with all associated parameters, such as the JavaScript code to execute, subscription ID, gas limit for the callback transaction, and DoN ID of the Chainlink Functions network we wish to execute the code on.',
    highlightedLines: Array.from({ length: 29 }, (v, k) => 80 + k),
  },
  {
    label: 'Functions Response',
    content:
      'This is the function called by the Chainlink Functions DoN when it receives a response from the JavaScript code executed off-chain in the Chainlink Function.',
    highlightedLines: Array.from({ length: 13 }, (v, k) => 110 + k),
  },
]
