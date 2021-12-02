const auctionInfo = {
  data: {
    result: {
      auction_state: {
        era_validators: [
          {
            era_id: 2942,
            validator_weights: [
              {
                public_key: '01026ca707c348ed8012ac6a1f28db031fadd6eb67203501a353b867a08c8b9a80',
                weight: '176679679178989272'
              },
              {
                public_key: '01031cdce87d5fe53246492f9262932f9eb7421ea54b30da1eca06874fd2a7df60',
                weight: '8956953150808134'
              },
              {
                public_key: '0103dd8b2b18ef0b9fd5b7c8e340b104ee4d966f2a167eb1a938963f8c8f699a45',
                weight: '1797893364150569'
              }
            ]
          }
        ],
        bids: [
          {
            public_key: '01026ca707c348ed8012ac6a1f28db031fadd6eb67203501a353b867a08c8b9a80',
            bid: {
              bonding_purse: 'uref-f5c19e7cd2abcb30f99fd0c5a5f39b2211317ebe645736e32a56e014c20a4514-007',
              staked_amount: '1870655146893008',
              delegation_rate: 30,
              delegators: [
                {
                  public_key: '0115939cf8687a4e132ba2444c0350698e397952aa86f3248e61fb0cfc15ac527b',
                  staked_amount: '34634548674265891',
                  bonding_purse: 'uref-575de810398cc4f39e88c56f3684965b82a5c79e14df8d5fbe74a62962de0bb5-007',
                  delegatee: '01026ca707c348ed8012ac6a1f28db031fadd6eb67203501a353b867a08c8b9a80'
                },
                {
                  public_key: '0116ae12c080bbdd5f9cc8dd9e6b02aedc02f7e26d3e83f479f89cd7b1006a4f2a',
                  staked_amount: '2935116432410',
                  bonding_purse: 'uref-613e5de3cf7ece1870c4695e2a4045dfff85685fc58ebd3fab68bacd9b900d2d-007',
                  delegatee: '01026ca707c348ed8012ac6a1f28db031fadd6eb67203501a353b867a08c8b9a80'
                }
              ]
            }
          },
          {
            public_key: '01031cdce87d5fe53246492f9262932f9eb7421ea54b30da1eca06874fd2a7df60',
            bid: {
              bonding_purse: 'uref-996211c05d77b8282ffc88e69f82587063ce458458c04172867303096f825c60-007',
              staked_amount: '17728558963057',
              delegation_rate: 5,
              delegators: [
                {
                  public_key: '01031cdce87d5fe53246492f9262932f9eb7421ea54b30da1eca06874fd2a7df60',
                  staked_amount: '399118592160557',
                  bonding_purse: 'uref-bb7052142724452823212bae190b0d2438e1d2d89df449eff62769a1fffed3b0-007',
                  delegatee: '01031cdce87d5fe53246492f9262932f9eb7421ea54b30da1eca06874fd2a7df60'
                }
              ]
            }
          }
        ]
      }
    }
  }
}

const peers = {
  data: {
    result: {
      peers: [
        {
          node_id: 'tls:0231..3534',
          address: '54.238.212.246:8008'
        },
        {
          node_id: 'tls:0395..925d',
          address: '45.76.251.225:35000'
        },
        {
          node_id: 'tls:044d..328d',
          address: '88.99.95.7:35000'
        }
      ]
    }
  }
}

const status = {
  data: {
    api_version: '1.4.1',
    chainspec_name: 'casper',
    starting_state_root_hash: '9824d1a7ff36a74fa916360a88087fcc64b36575d05745b8ac1dd288cfb18145',
    peers: [
      {
        node_id: 'tls:0231..3534',
        address: '54.238.212.246:8008'
      },
      {
        node_id: 'tls:0395..925d',
        address: '45.76.251.225:35000'
      },
      {
        node_id: 'tls:044d..328d',
        address: '88.99.95.7:35000'
      }
    ],
    our_public_signing_key: '0111b98cd68f6d3950def8ec94f2859434d823fddd020e3a929dd938a8a5e71f33'
  }
}

const location = {
  data: {
    'country': 'Netherlands',
    'isp': 'DigitalOcean, LLC',
    'lat': 52.352,
    'lon': 4.9392,
    'org': 'Digital Ocean'
  }
}

const validator = {
  delegators: [
    { staked_amount: '3909076514885', public_key: '01031cdce87d5fe53246492f9262932f9eb7421ea54b30da1eca06874fd2a7df60' }
  ],
  public_key: '01031cdce87d5fe53246492f9262932f9eb7421ea54b30da1eca06874fd2a7df60',
  timestamp: 1633037695958,
  inactive: true,
  self_stake: '10417631901693',
  delegators_stake: '7148715334907',
  total_stake: '17566347236600',
  current_stake: null,
  ip: '139.59.226.13',
  version: '1.3.2',
  vps: 'Digital Ocean',
  country: 'Singapore',
  latitude: 1.32123,
  longitude: 103.695
}

const logger = {
  name: 'Test',
  failCount: 1,
  failedAt: '01.12.2021',
  nextRunAt: '01.12.2021',
  failReason: 'Error'
}

export { auctionInfo, peers, status, location, validator, logger }