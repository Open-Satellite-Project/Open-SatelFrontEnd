import React, { useState } from 'react';






function BusStop() {

    const [slotid] = useParams();
    const [notices, setNotices] = useState([false]);
    const [isLoading, setIsLoading] = useState([false]);
    const [selectedNotice, setSelectedNotice] = useState([null]);

    

    return (
        <div>

        </div>
    );
};

export default BusStop;