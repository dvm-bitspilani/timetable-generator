import React from "react";
import Async from "react-async"

const Courses = () => {
  <Async promiseFn={loadUsers}>
    {({ data, err, isLoading }) => {
      if (isLoading) return "Loading...";
      if (err) return `Something went wrong: ${err.message}`;

      if (data)
        return (
          <div>
            <div>
              <h2>React Async - Random Users</h2>
            </div>
            {data.map((user) => (
              <div key={user.username} className="row">
                <div className="col-md-12">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        );
    }}
  </Async>;
};

export default Courses;
