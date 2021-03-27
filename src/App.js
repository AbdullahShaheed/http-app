import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.endPoint1);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.endPoint1, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    await http.put(config.endPoint1 + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };

    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(config.endPoint1 + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast("Post not found.");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer autoClose={2000} />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

// I can use the below code to work with the customers end point
//in my MVC Dijla project. Just comment the up code and operate this below code
//but I need the chrome without CORS shortcut to run Chrome with disabled CORS

// class App extends Component {
//   state = {
//     customers: [],
//   };

//   async componentDidMount() {
//     // pending > fulfilled on (success) or rejected on (failure)
//     const { data: customers } = await http.get(config.endPoint2);
//     this.setState({ customers });
//   }

//   handleAdd = async () => {
//     const obj = {
//       name: "a",
//       isSubscribedToNewsletter: false,
//       membershipTypeId: 1,
//       rentals: [],
//     };
//     const { data: customer } = await http.post(config.endPoint2, obj);

//     const customers = [customer, ...this.state.customers];
//     this.setState({ customers });
//   };

//   handleUpdate = async (customer) => {
//     console.log(customer);
//     customer.name = "updated";
//     await http.put(config.endPoint2 + "/" + customer.id, customer);

//     const customers = [...this.state.customers];
//     const index = customers.indexOf(customer);
//     customers[index] = { ...customer };

//     this.setState({ customers });
//   };

//   handleDelete = async (customer) => {
//     console.log(customer);
//     const originalCustomers = this.state.customers;

//     const customers = this.state.customers.filter((c) => c.id !== customer.id);
//     this.setState({ customers });

//     try {
//       await http.delete(config.endPoint2 + "/" + customer.id);
//     } catch (ex) {
//       if (ex.response && ex.response.status === 404)
//         toast("Customer not found.");
//       this.setState({ customers: originalCustomers });
//     }
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <ToastContainer></ToastContainer>
//         <button className="btn btn-primary" onClick={this.handleAdd}>
//           Add
//         </button>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Birth Date</th>
//               <th>Subscribed</th>
//               <th>MembershipType Id</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.customers.map((customer) => (
//               <tr key={customer.id}>
//                 <td>{customer.name}</td>
//                 <td>{customer.birthdate}</td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={customer.isSubscribedToNewsletter}
//                   ></input>
//                 </td>
//                 <td>{customer.membershipTypeId}</td>
//                 <td>
//                   <button
//                     className="btn btn-info btn-sm"
//                     onClick={() => this.handleUpdate(customer)}
//                   >
//                     Update
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => this.handleDelete(customer)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </React.Fragment>
//     );
//   }
// }

// export default App;
