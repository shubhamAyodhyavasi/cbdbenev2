import { connect } from 'react-redux';
import {
    setReferrer
} from '../redux/actions'
import { makeCancelable } from "../services/makeCancelable";
import BasicFunction from "../services/extra/basicFunction";
import { addAmbassador } from "../services/api"
const basicFunction = new BasicFunction();
class AppWrapper extends React.Component {
    componentDidMount(){
        this.referrerSetting()
        if(typeof this.props.router !== "undefined"){
            const {
                query, asPath
            } = this.props.router
            if(query.ref){
            }
        }
    }
    referrerSetting() {
      if(typeof window !== "undefined"){
        const { href, pathname } = window.location;
        const { setReferrer, referrer } = this.props;
        var url = new URL(window.location.href);
        const ambassador_id = url.searchParams.get("ref");
        var referralUrl = referrer.referralUrl
          ? referrer.referralUrl
          : document.referrer;
        const cUrl = href;
        const originalUrl = basicFunction.removeParams(cUrl, "ref");
        if (referralUrl) {
          if (referralUrl.includes(window.origin)) {
            referralUrl = "";
          }
        }
        if (ambassador_id) {
              setReferrer({
              ambassadorId: ambassador_id,
              ambassadorUrl: referralUrl,
              referralUrl: referralUrl
              });
              this.cancelableRef = makeCancelable(
              addAmbassador({
                  ambass_id: ambassador_id,
                  url: originalUrl,
                  refer_url: referralUrl
              }),
              res => {
                  const resJson = res.data
                  if (resJson.status) {
                  setReferrer({
                      referralUrl: null
                  });
                  if (resJson.referral) {
                      setReferrer({
                      referralUrlId: resJson.referral._id
                      });
                  }
                  } else {
                  this.setState({
                      modal: true,
                      affMsg: "Invalid Referral Url ."
                  });
                //   setTimeout(() => {
                //     this.props.history.push(url)                      this.props.history.push(url);
                //   }, 2000);
                  }
              },
              err => {
                  this.setState({
                  modal: true,
                  affMsg: "Invalid Referral Url ."
                  });
                  setTimeout(() => {
                  this.props.history.push(url);
                  }, 2000);
              }
              );
          }
        }
    }
    render(){
        return (
            <>
                {this.props.children}
            </>
        )
    }
}
const mapStateToProps = state => ({
    referrer: state.referrer
})
export default connect(mapStateToProps, {setReferrer} )(AppWrapper)