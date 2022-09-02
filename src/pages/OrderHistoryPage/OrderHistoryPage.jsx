import { checkToken } from '../../utilities/users-service';

export default function OrderHistoryPage() {
  
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate.toLocaleDateString())
  }

  return (
    <>
      <h1>OrderHistoryPage</h1>
    </>
  );
}