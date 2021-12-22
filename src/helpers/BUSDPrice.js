
import axios from 'axios'
export const getBUSDPrice = async () => {

    var response = await axios.get('https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=PB3KKUUMP9A9FVEFVGWZESKUVT6XGVX4JC');

    if(response.status === 200){
        return response.data.result.ethusd;
    }
    else{
        return 0;
    }

}