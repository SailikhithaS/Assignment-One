import React, { useState, useEffect } from 'react';
import './launch-screen.css';

function LaunchScreen() {

    const [state, setState] = useState([]);

    useEffect(async () => {
        const url = 'https://api.spaceXdata.com/v3/launches?limit=100';
        const response = await fetch(url);
        const data = await response.json();
        setState(data)
    }, [])

    const LaunchDetails = ({ launchHeader, launchDetails }) => {
        return (
            <div className="header-details">
                <span>{launchHeader}:</span>
                <span>{launchDetails}</span>
            </div>
        )
    }
    return (
        state?.length > 0 && state.map((launch, index) => (
            <div key={index} className="launch-container">
                <img style={{ width: '150px', height: '200px' }} src={launch?.links?.mission_patch} />
                <div>
                    <div className="header-details"><a className="launch-link" target="_blank" rel="noopener noreferrer" href={launch?.links?.article_link}>{launch?.mission_name + '#' + (index + 1)}</a></div>
                    <div className="header-details">
                        <span>Mission Ids:</span>
                        {launch?.mission_id?.length > 0 && launch.mission_id.map((ids) => (
                            <span>{ids}</span>
                        ))}
                    </div>
                    <LaunchDetails launchHeader="Launch Year" launchDetails={launch?.launch_year} />
                    <LaunchDetails launchHeader="Successful Launch" launchDetails={launch?.launch_success} />
                    <LaunchDetails launchHeader="Successful Landing" launchDetails={''} />
                </div>
            </div >
        ))
    )

}


export default LaunchScreen;
