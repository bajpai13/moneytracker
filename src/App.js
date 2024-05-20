// import { useEffect, useState } from 'react';
// import './App.css';

// function App() {
// const [name, setName] = useState("");
// const [datetime, setDatetime] = useState("");
// const [description, setDescription] = useState("");
// const [transactions, setTransactions] = useState("");
// useEffect(()=>{
//   getTransactions().then(setTransactions);
// }, []);

// async function getTransactions() {
//    const url = process.env.REACT_APP_API_URL + "/transactions";
//    const response = await fetch(url);
//    return await response.json();
// }

//   function addNewTransaction(ev){
//     ev.preventDefault();
//     const url = process.env.REACT_APP_API_URL+'/transaction';
//     const price = name.split(' ')[0];
//     fetch(url,{
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         price,
//         name: name.substring(price.length+1),
//         datetime,
//         description})
//     }).then(response=>{
//       response.json().then(json=>{
//         setName('');
//         setDatetime('');
//         setDescription('');
//         console.log('result',json);
//       });
//     });
//   }

//   let balance = 0;
//   for (const transaction of transactions) {
//     balance = balance + transaction.price;
//   }

//   balance = balance.toFixed(2);
//   const fraction = balance.split('.')[1];
//   balance = balance.split('.')[0];

//   return (
//     <main>
//       <h1>
//         ${balance}.<span>00</span>
//       </h1>
//       <form onSubmit={addNewTransaction}>
//         <div className="basic">
//           <input
//             type="text"
//             value={name}
//             onChange={(ev) => setName(ev.target.value)}
//             placeholder={"+200 new samsung tv "}
//           />
//           <input
//             value={datetime}
//             onChange={(ev) => setDatetime(ev.target.value)}
//             type="datetime-local"
//           />
//         </div>
//         <div className="description">
//           <input
//             type="text"
//             value={description}
//             onChange={(ev) => setDescription(ev.target.value)}
//             placeholder={"description"}
//           />
//         </div>
//         <button type="submit">Add New Transaction</button>
//       </form>
//       <div className="transactions">
//         {transactions.length > 0 &&
//           transactions.map((transaction) => (
//             <div className="transaction">
//               <div className="left">
//                 <div className="name">{transaction.name}</div>
//                 <div className="desc">{transaction.description}</div>
//               </div>
//               <div className="right">
//                 <div className={"price " +(transaction.price<0?"red":"green")}>{transaction.price}</div>
//                 <div className="time">{transaction.datetime}</div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </main>
//   );
// }

// export default App;







import { useEffect, useState } from "react";
import "./App.css";
import { format } from "date-fns"; // Import date-fns

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = parseFloat(name.split(" ")[0]);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.toString().length + 1),
        datetime,
        description,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDatetime("");
        setDescription("");
        console.log("result", json);
        getTransactions().then(setTransactions); // Refresh transactions
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <main>
      <h1>
        ${balance}.<span>{fraction}</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={"+200 new Samsung TV "}
          />
          <input
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder={"description"}
          />
        </div>
        <button type="submit">Add New Transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div className="transaction" key={transaction._id}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="desc">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="time">
                  {format(
                    new Date(transaction.datetime),
                    "yyyy-MM-dd HH:mm:ss"
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;

