import UpdateItem from '../components/UpdateItem';
import React from "react";

const Update = ({ query }) => (
    <div>
        <UpdateItem id={query.id}/>
    </div>
);

export default Update;
