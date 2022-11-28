import React from "react";

const Blogs = () => {
  return (
    <div className="mt-10 mb-10 grid lg:grid-cols-2 md:grid-cols-1 gap-4">
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100 mx-auto">
        <article>
          <h2 className="text-xl font-bold">
            What are the different ways to manage a state in a React
            application?
          </h2>
          <hr />
          <p>
            There are four main types of state you need to properly manage in
            your React apps:
          </p>
          <p className="mt-4 dark:text-gray-400">
            <li>Local state</li>
            <li>Global state</li>
            <li>Server state</li>
            <li>URL state</li>
            <span>
              1. For example, local state would be needed to show or hide a
              modal component or to track values for a form component, such as
              form submission, when the form is disabled and the values of a
              form’s inputs.
            </span>
            <hr className="mb-2" />

            <span className="mt-4">
              2. Global state is necessary when we want to get and update data
              anywhere in our app, or in multiple components at least. A common
              example of global state is authenticated user state. If a user is
              logged into our app, it is necessary to get and change their data
              throughout our application.
            </span>
            <hr className="mb-2" />

            <span className="mt-4">
              3. Server state is a simple concept, but can be hard to manage
              alongside all of our local and global UI state. There are several
              pieces of state that must be managed every time you fetch or
              update data from an external server, including loading and error
              state.
            </span>
          </p>
        </article>
      </div>
      
      {/* number 2  */}
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100 mx-auto">
        <article>
          <h2 className="text-xl font-bold">
          How does prototypical inheritance work?
          </h2>
          <hr />
          <p className="mt-4 dark:text-gray-400">
          The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
          </p>
        </article>
      </div>

      {/* number 3  */}
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100 mx-auto">
        <article>
          <h2 className="text-xl font-bold">
          What is a unit test? Why should we write unit tests?
          </h2>
          <hr />
          <p className="mt-4 dark:text-gray-400">
          The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
          </p>
        </article>
      </div>
      {/* number 4  */}
      <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100 mx-auto">
        <article>
          <h2 className="text-xl font-bold">
          React vs. Angular vs. Vue?
          </h2>
          <hr />
          <p className="mt-4 dark:text-gray-400">
            <h1>Angular vs React</h1>
            <hr />
          React is more suitable for intermediate to advanced JavaScript developers who are familiar with concepts from ES6 and up, while Angular favors those same developers who are also familiar with TypeScript.
          </p>
          <p className="mt-4 dark:text-gray-400">
            <h1>React vs Vue</h1>
            <hr />
            Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage.
          </p>
          <p className="mt-4 dark:text-gray-400">
            <h1>Angular vs Vue</h1>
            <hr />
            A large library like Angular would require more diligence in keeping up with what’s new, while Vue would be less demanding in this regard and the fact that the two most recent major releases of Vue are in separate repositories helps.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Blogs;
