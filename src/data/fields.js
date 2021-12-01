import { CONTRACT_MODELS } from '../utils/tokenExplorerApi';
import { MINION_TYPES } from '../utils/proposalUtils';

export const INFO_TEXT = {
  SHARES_REQUEST:
    'Shares provide voting power and exposure to assets. Whole numbers only please.',
  LOOT_REQUEST:
    'Loot provides exposure to assets but not voting power. Only whole numbers accepted here, no decimals plz',
  APPLICANT:
    'Address to receive the Tokens, Shares, Loot, and/or Funding requested in this proposal.',
  TOKEN_TRIBUTE:
    'Only tokens approved by the DAO are allowed here. Members can add more approved tokens with Token proposals',
  PAYMENT_REQUEST: 'Request Funds from the DAO',
  ADDR_KICK: 'Enter the public key of the member you would like to kick.',
  MINION_TYPES: 'Minion funds to be used for this transaction',
  MINION_PAYMENT: `This is the amount of value to be sent from the selected minion's balance`,
  DELEGATE_ADDRESS:
    'Warning: By switching your address to a delegate, you are giving that delegate address the right to act on your behalf.',
  NFT_PRICE: 'Price in xDai',
  MINION_VALUE: 'Value in wei of network token for payable functions.',
  SPAM_FILTER_AMOUNT:
    'Proposals with tribute offered less than this amount in the deposit token will be filterd out of your proposal list.',
  MINION_QUORUM:
    'Warning: 51% or more is recommended to ensure the community majority approve decisions.',
  NIFTY_REPAYMENT_REQUEST:
    'This proposal requires the selected minion to hold the XDAI funds to purchase the NiftyInk. Enter that amount in WXDAI to repay the minion from the DAO treasury.',
  QUORUM:
    'Allows the DAO to execute proposals once a set percentage of passed votes has been reached. We recommend 50% or higher. This cannot be changed once deployed.',
  RAGE_QUIT_INPUT: 'Shares or loot to rage quit. Whole numbers only please.',
  SAFE_ADDRESS: 'Address of an already deployed Gnosis Safe.',
  TRIBUTE_MINION:
    'This is the minion that will receive the NFT after the proposal passes.',
  NFT_ADDRESS: 'This should be the contract address for the NFT.',
  NFT_TOKEN_ID:
    'This should be the Token ID for your NFT and then select the correct NFT standard.',
  BUYOUT_MINION: 'This proposal must be executed by a minion.',
};

export const FIELD = {
  TITLE: {
    type: 'input',
    label: 'Title',
    name: 'title',
    htmlFor: 'title',
    placeholder: 'Proposal Title',
    expectType: 'any',
  },
  TOKENS: {
    type: 'multiInput',
    label: 'Tokens',
    name: 'tokens',
    htmlFor: 'tokens',
    placeholder: 'tokenAddress',
    expectType: 'arrayStrings',
  },
  DESCRIPTION: {
    type: 'textarea',
    label: 'Description',
    name: 'description',
    htmlFor: 'description',
    placeholder: 'Your description here.',
    expectType: 'any',
  },
  SHARES_REQUEST: {
    type: 'input',
    label: 'Shares Requested',
    name: 'sharesRequested',
    htmlFor: 'shares',
    placeholder: '0',
    info: INFO_TEXT.SHARES_REQUEST,
    expectType: 'integer',
  },
  LOOT_REQUEST: {
    type: 'input',
    label: 'Loot Requested',
    name: 'lootRequested',
    htmlFor: 'loot',
    placeholder: '0',
    info: INFO_TEXT.LOOT_REQUEST,
    expectType: 'integer',
  },
  LINK: {
    type: 'linkInput',
    label: 'Link',
    name: 'link',
    htmlFor: 'link',
    placeholder: 'daolink.club',
    expectType: 'urlNoHTTP',
  },
  MINION_VALUE: {
    type: 'input',
    label: 'Value',
    name: 'minionValue',
    htmlFor: 'minionValue',
    placeholder: '0',
    expectType: 'number',
    info: INFO_TEXT.MINION_VALUE,
  },
  APPLICANT: {
    type: 'applicantInput',
    htmlFor: 'applicant',
    name: 'applicant',
    placeholder: '0x',
    label: 'Recipient',
    info: INFO_TEXT.APPLICANT,
    expectType: 'address',
  },
  TRIBUTE: {
    type: 'tributeInput',
    htmlFor: 'tribute',
    name: 'tributeOffered',
    placeholder: '0',
    label: 'Tribute Offered',
    info: INFO_TEXT.TOKEN_TRIBUTE,
    expectType: 'number',
  },
  PAYMENT_REQUEST: {
    type: 'paymentInput',
    htmlFor: 'paymentRequested',
    name: 'paymentRequested',
    placeholder: '0',
    label: 'Payment Requested',
    info: INFO_TEXT.PAYMENT_REQUEST,
    expectType: 'number',
  },
  ONLY_ERC20: {
    type: 'gatedInput',
    only: CONTRACT_MODELS.ERC20,
    label: 'ERC-20 Address',
    name: 'erc20TokenAddress',
    htmlFor: 'erc20TokenAddress',
    placeholder: '0x',
    expectType: 'address',
  },
  ONLY_ERC721: {
    type: 'gatedInput',
    only: CONTRACT_MODELS.ERC721,
    label: 'ERC-721 Address',
    name: 'erc721TokenAddress',
    htmlFor: 'erc20TokenAddress',
    placeholder: '0x',
    expectType: 'address',
  },
  ONLY_SAFE: {
    type: 'gatedInput',
    only: CONTRACT_MODELS.GNOSIS_SAFE,
    label: 'Gnosis Safe Address',
    name: 'safeAddress',
    htmlFor: 'safeAddress',
    placeholder: '0x',
    info: INFO_TEXT.SAFE_ADDRESS,
    expectType: 'address',
  },
  //  Plain old input until token price API can be built
  MINION_PAYMENT: {
    type: 'minionPayment',
    htmlFor: 'minionPayment',
    name: 'minionPayment',
    selectName: 'minionToken',
    placeholder: '0',
    label: 'Minion Payment',
    info: INFO_TEXT.MINION_PAYMENT,
    expectType: 'number',
    modifiers: ['addMinionVaultDecimals'],
  },
  MINION_SELECT: {
    type: 'minionSelect',
    label: 'Select a minion',
    name: 'selectedMinion',
    htmlFor: 'selectedMinion',
    placeholder: 'Choose a DAO minion',
    expectType: 'address',
    filters: {
      [MINION_TYPES.SAFE]: minionVault => {
        return minionVault.isMinionModule;
      },
    },
  },
  ABI_INPUT: {
    type: 'abiInput',
    label: 'Contract Function',
    name: 'abiInput',
    htmlFor: 'abiInput',
    placeholder: '0x',
    expectType: 'string',
  },
  TARGET_CONTRACT: {
    type: 'targetContract',
    label: 'Contract Address',
    name: 'targetContract',
    htmlFor: 'targetContract',
    placeholder: '0x',
    expectType: 'address',
  },
  SET_PRICE: {
    type: 'priceInput',
    htmlFor: 'orderPrice',
    name: 'orderPrice',
    placeholder: '0',
    label: 'Set Price (Take)',
    expectType: 'number',
  },
  NFT_SELECT: {
    type: 'nftSelect',
    htmlFor: 'nftAddress',
    name: 'nftAddress',
    label: 'Select an NFT',
    expectType: 'any',
  },
  RARIBLE_NFT_DATA: {
    type: 'raribleNftData',
    htmlFor: 'raribleNftData',
    name: 'raribleNftData',
    label: 'Vaild Rarible Order Data',
    expectType: 'any',
  },
  DATE_RANGE_SWITCH: {
    type: 'toggleForm',
    listenTo: 'formCondition',
    checked: 'fixed',
    unchecked: 'unset',
    label: {
      type: 'formCondition',
      fixed: 'Fixed Length',
      unset: 'Unset',
    },
    title: 'Auction Duration',
    expectType: 'any',
  },
  NFT_INPUT: {
    type: 'input',
    htmlFor: 'nftAddress',
    name: 'nftAddress',
    placeholder: '0x',
    label: 'Token Address',
    expectType: 'address',
    info: INFO_TEXT.NFT_ADDRESS,
  },
  TOKEN_INFO_INPUT: {
    type: 'tokenInfoInput',
    htmlFor: 'tokenId',
    name: 'tokenId',
    placeholder: '0',
    label: 'Token Info',
    expectType: 'number',
    info: INFO_TEXT.NFT_TOKEN_ID,
  },
  NFT_APPROVAL: {
    type: 'nftApproval',
    htmlFor: 'nftApproval',
    name: 'nftApproval',
    label: 'NFT Approval',
    expectType: 'boolean',
  },
  DATE_RANGE: {
    type: 'dateRange',
    htmlFor: 'dateRange',
    name: 'dateRange',
    label: 'Set Date Range',
    expectType: 'any',
  },
  DELEGATE_ADDRESS: {
    type: 'input',
    htmlFor: 'delegateAddress',
    name: 'delegateAddress',
    placeholder: '0x',
    label: 'Address',
    info: INFO_TEXT.DELEGATE_ADDRESS,
    expectType: 'address',
  },
  DESTINATION_ADDRESS: {
    type: 'input',
    htmlFor: 'destination',
    name: 'destination',
    placeholder: '0x',
    label: 'Destination',
    expectType: 'address',
  },
  NFT_PRICE: {
    type: 'input',
    label: 'Price',
    name: 'price',
    htmlFor: 'price',
    placeholder: '0',
    info: INFO_TEXT.NFT_PRICE,
    expectType: 'number',
    modifiers: ['addWeiDecimals'],
  },
  MINION_NAME: {
    type: 'input',
    label: 'Minion Name',
    name: 'minionName',
    helperText: 'All minions get a name',
    htmlFor: 'minionName',
    placeholder: 'Sally',
    expectType: 'any',
  },
  MINION_QUORUM: {
    type: 'checkGate',
    title: 'Allow Minimum Quorum',
    description: INFO_TEXT.QUORUM,
    renderOnCheck: {
      name: 'minQuorum',
      htmlFor: 'minQuorum',
      label: 'Minumum Quorum',
      expectType: 'number',
      append: '%',
      type: 'input',
      info: INFO_TEXT.MINION_QUORUM,
      placeholder: '51',
    },
  },
  SALT_NONCE: {
    type: 'saltGenerator',
    label: 'Salt Nonce',
    name: 'saltNonce',
    hidden: true,
    htmlFor: 'saltNonce',
    expectType: 'any',
  },
  NIFTY_MINION_PAYMENT_REQUEST: {
    type: 'paymentInput',
    htmlFor: 'paymentRequested',
    name: 'paymentRequested',
    placeholder: '0',
    label: 'Minion Repayment Requested',
    info: INFO_TEXT.NIFTY_REPAYMENT_REQUEST,
    expectType: 'number',
    modifiers: ['addPaymentDecimals'],
  },
  NIFTY_INK_URL: {
    type: 'targetInk',
    htmlFor: 'targetInk',
    name: 'targetInk',
    label: 'Target NiftyInk Url',
    expectType: 'any',
  },
  NFT_URI: {
    type: 'targetNft',
    htmlFor: 'targetNft',
    name: 'targetNft',
    label: 'Target NFT Uri',
    expectType: 'any',
  },
  PROPOSAL_NAME: {
    name: 'name',
    type: 'input',
    label: 'Proposal Name',
    htmlFor: 'Name',
    helperText: 'Max 30 characters',
    placeholder: 'Proposal Name',
    expectType: 'any',
  },
  // PARAGRAPHS: {
  //   type: 'paragraphs',
  //   pars: [] /* Overwrite with customCopy */,
  // },
  // HEADER: {
  //   type: 'header',
  //   headerText: 'Empty' /* Overwrite with custom Copy */,
  // },
  MINION_TYPE_SELECT: {
    type: 'minionTypeSelect',
    name: 'minionType',
    label: 'Choose a Minion Type',
    expectType: 'any',
  },
  SUPERFLUID_RATE: {
    type: 'superfluidRate',
    htmlFor: 'superfluidRate',
    name: 'superfluidRate',
    label: 'Streaming Rate',
    expectType: 'greaterThanZero',
  },
  SUPERFLUID_PAYMENT_REQUEST: {
    type: 'superfluidPaymentInput',
    htmlFor: 'paymentRequested',
    name: 'paymentRequested',
    placeholder: '0',
    label: 'Payment Requested',
    info: INFO_TEXT.PAYMENT_REQUEST,
    expectType: 'number',
    modifiers: ['addPaymentDecimals'],
  },
  BUYOUT_PAYMENT_REQUEST: {
    type: 'buyoutPaymentInput',
    htmlFor: 'paymentRequested',
    name: 'paymentRequested',
    placeholder: '0',
    label: 'Request Funds',
    expectType: 'number',
    modifiers: ['addPaymentDecimals'],
  },
  RAGE_QUIT_INPUT: {
    type: 'rageInput',
    label: 'Shares To Rage',
    name: 'shares',
    htmlFor: 'shares',
    placeholder: '0',
    info: INFO_TEXT.RAGE_QUIT_INPUT,
    expectType: 'integer',
  },
  COLOR_PICKER: {
    type: 'colorPicker',
    label: 'Color',
    name: 'color',
    htmlFor: 'color',
    expectType: 'any',
  },
  DISCOURSE_META: {
    type: 'discourseMeta',
    name: 'discourseMeta',
    htmlFor: 'discourseMeta',
    expectType: 'any',
  },
  SUMMON_MODE_SWITCH: {
    type: 'toggleForm',
    listenTo: 'formCondition',
    checked: 'advanced',
    unchecked: 'easy',
    label: {
      type: 'formCondition',
      easy: 'Easy Mode',
      advanced: 'Advanced Mode',
    },
    title: 'Minion Setup',
    expectType: 'any',
  },
  BASIC_SWITCH: {
    type: 'switch',
    checked: 'true',
    unchecked: 'false',
    label: 'Yes or No?',
    expectType: 'any',
  },
  DISPERSE_CSV: {
    type: 'disperseListInput',
    listenTo: 'formCondition',
    label: 'Address List',
    name: 'disperseList',
    htmlFor: 'disperseList',
    disperseType: {
      type: 'formCondition',
      eth: 'eth',
      token: 'token',
    },
    placeholder: '0x1234...5678 1.23 \n0x8765...4321,3.21\n0x5678...1234=3.21',
    expectType: 'disperseList',
  },
  DISPERSE_TYPE_SWTICH: {
    type: 'toggleForm',
    listenTo: 'formCondition',
    checked: 'eth',
    unchecked: 'token',
    label: {
      type: 'formCondition',
      token: 'Token',
      eth: 'Eth',
    },
    title: 'Funding Type',
    expectType: 'any',
  },
  MINION_TOKEN_SELECT: {
    type: 'minionTokenSelect',
    label: 'Select a Token',
    name: 'tokenAddress',
    htmlFor: 'tokenAddress',
    placeholder: 'Choose a Token',
    expectType: 'address',
  },
};

export const FORM_DISPLAY = {
  LOOT_REQUEST: {
    type: 'lootGrabDisplay',
    name: 'lootRequested',
    listenTo: 'tributeOffered',
    label: 'Loot Requested',
    fallback: '0',
    expectType: 'number',
  },
};
