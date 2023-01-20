import { useAuth0, User } from "@auth0/auth0-react";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  executePaymentGenin,
  executePaymentChuunin,
  executePaymentJounin,
  executePayment,
  getUserResourceWithGoogle,
  getUserResource,
  updateUser,
} from "../../../redux/actions";
import {  useAppDispatch, useAppSelector } from "../../../redux/hooks";

export default function Plan() {
  let { search } = useLocation();
  let searchParams = new URLSearchParams(search);

  const history = useHistory();

  let userDB = useAppSelector((state) => state["user"]);
  const { isLoading, getAccessTokenSilently, user } = useAuth0<User>();


  const tokenPlan = searchParams.get("token")!;
  const typePlan = searchParams.get('plan');
  const dispatch = useAppDispatch();


  const verifyPayment = async (tokenPlan: string, userId: string, plan: string) => {
    await dispatch(executePayment(userId, tokenPlan, plan))
    .then((val)=> {
      console.log('UPDATE USER:' , val)
      dispatch(updateUser(val))
    })
    history.push("/profile/plan");
  };
  
  const getRegularToken = useCallback(async () => {
    return window.localStorage.getItem('token')  
  }, [])

  




  useEffect(() => {
    if(userDB.id && tokenPlan && typePlan) {
      verifyPayment(tokenPlan ,userDB.id, typePlan );
      // .then(()=> {
      //   if(user) {
      //     let token = getAccessTokenSilently();
      //     dispatch(getUserResourceWithGoogle(token, user))
      //   }
      // });

    }
 
  
  }, [tokenPlan, userDB.id, typePlan, userDB.plan?.length]);
  //plan?token=asdsadsad
  if(tokenPlan?.length) return (
    <div>
      We're almost ready. Processing Payment
    </div>
  ) 
  else  {
    return (
    <div>
      <h1>{userDB.plan}</h1>
    </div>
    );
    {/* <h2>{userDB.token}</h2> */}
  
  }
}
