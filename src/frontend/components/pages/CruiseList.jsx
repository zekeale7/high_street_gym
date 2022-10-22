import { useEffect, useState } from "react";

export const CruiseList = () => {
    const [cruise_list_data, set_cruise_list_data] = useState([]);

    useEffect(() => {
        fetch("/api/cruises/all")
            .then((res) => res.json())
            .then((response) => {
                if (response.status == 200) {
                    set_cruise_list_data(response.cruises);
                }
            });
    }, []);

    return (
        <section className="cruise-list">
            {cruise_list_data.map((cruise_item_data) => (
                <CruiseItem cruise={cruise_item_data} />
            ))}
        </section>
    );
};

const CruiseItem = ({ cruise }) => {
    return (
        <section className="cruise-item">
            <span>Ship: {cruise.ship_name ?? "Not specified"}</span>
            <span>
                Departure Date: {cruise.departure_date ?? "Not specified"}
            </span>
            <span>From: {cruise.from ?? "Not specified"}</span>
            <span>To: {cruise.to ?? "Not specified"}</span>
            <span>
                Passenger Capacity:{" "}
                {cruise.passenger_capacity ?? "Not specified"}
            </span>
        </section>
    );
};