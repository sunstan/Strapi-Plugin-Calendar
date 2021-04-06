import React from 'react';
import Home from '../Home';
import {RecoilRoot} from 'recoil';
import pluginId from '../../pluginId';
import {Switch, Route} from 'react-router-dom';
import {NotFound} from 'strapi-helper-plugin';

const App = () => {
    return (
        <div>
            <RecoilRoot>
                    <Switch>
                        <Route path={`/plugins/${pluginId}`} component={Home} exact/>
                        <Route component={NotFound}/>
                    </Switch>
            </RecoilRoot>
        </div>
    );
};

export default App;
