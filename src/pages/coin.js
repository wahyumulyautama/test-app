import './coin.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Coin() {
    const [detail, setDetail] = useState('');
    const { id } = useParams();
    useEffect(() => {
        fetchData();
    }, []);
    function fetchData() {
    fetch(`https://api.coinpaprika.com/v1/coins/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setDetail(data);
        });
    }
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{background: 'white', padding: '10px'}}>
        <img src={detail.logo} />
        <p>
           Id: {detail.id}
        </p>
        <p>
           Rank: {detail.rank}
        </p>
        <p>
           Symbol: {detail.symbol}
        </p>
        <p>
           Name: {detail.name}
        </p>
        </div>
    </div>
  );
}

export default Coin;
