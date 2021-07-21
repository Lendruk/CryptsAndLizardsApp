import { Button } from 'antd';
import Search from 'antd/lib/input/Search';
import { Campaign } from '../../Types/Campaign';
import './styles.scss';

function CampaignCard(campaign: Campaign) {

  return (
    <div className="Campaign">
      <div className="CampaignHeader"  style={{ backgroundImage: `url(${campaign.image})`}}>
        <h5>
          {campaign.title}
        </h5>
        <Button type="primary">Launch</Button>
      </div>
      <div className="CampaignContent">
        <section>
          {campaign.description}
        </section>
        <section className="Players">
          <h5>Players</h5>
          {campaign.players.map(player => (
          <div>
            {player.name} <img src={player.avatar} width='50' height='50' alt="player avatar" />
          </div>))}
        </section>
      </div>
    </div>
  )
}

export default function Campaigns() {
  const campaigns: Campaign[] = [{
      title: 'test Campaign',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus, architecto facere in magnam modi tempora veritatis a exercitationem, sunt sequi cupiditate nam adipisci ipsa expedita commodi eius cum vero!',
      image: 'https://media.discordapp.net/attachments/665340059582595102/867322830495416320/1626851020223.jpg',
      players: [
        {
          name: 'Bob',
          avatar: 'https://media.discordapp.net/attachments/665340059582595102/867322830495416320/1626851020223.jpg', 
        }
      ],
      _id: '0',
    },
    {
      title: 'test Campaign 2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus, architecto facere in magnam modi tempora veritatis a exercitationem, sunt sequi cupiditate nam adipisci ipsa expedita commodi eius cum vero!',
      image: 'https://media.discordapp.net/attachments/665340059582595102/867322830495416320/1626851020223.jpg',
      players: [
        {
          name: 'Alice',
          avatar: 'https://media.discordapp.net/attachments/665340059582595102/867322830495416320/1626851020223.jpg', 
        }
      ],
      _id: '1',
    }

  ];
  return (
    <div className="Campaigns">
      <div className="CampaignsHeader">
        <h4>
          Campaigns
        </h4>
        <Search placeholder="input search text" onSearch={() => {}} enterButton />
      </div> 
      <div className="CampaignContainer">
        {campaigns.map(campaign => CampaignCard(campaign))}
      </div>
    </div>
  );
}