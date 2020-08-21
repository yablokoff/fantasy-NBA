import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Page from "../components/Page";
import MainList from "../components/MainList";
import MainEmpty from "../components/MainEmpty";
import { CARDS_SHOW_COUNT } from "../constants/defaults";
import { showPreloader, hidePreloader, loadDailyPlayers } from "../actions";
import { LOAD_DAILY_PLAYERS_FULFILLED } from "../constants/ActionTypes";
import { formattingDailyPlayersResponse } from "../api";
import routes from "../constants/routes";


const MainPage = () => {
    const dispatch = useDispatch();
    const { ids: fetched_ids } = useSelector(state => state.fetchedCardsIDs);
    const { ids: selected_ids } = useSelector(state => state.selectedCardsIDs);
    const hasFetched = fetched_ids.length;
    const hasSelected = selected_ids.length;

    useEffect(() => {
        if (!hasSelected && !hasFetched) {
            dispatch(showPreloader());
            dispatch(
                loadDailyPlayers()
            ).then(
                ({value, action}) => {
                    if (action && action.type === LOAD_DAILY_PLAYERS_FULFILLED) {
                        const formattedData = formattingDailyPlayersResponse(value.data);
                        const count = formattedData.length;

                        if (count < CARDS_SHOW_COUNT) {
                            // случай захода на страницу во время заполнения таблицы
                            dispatch(hidePreloader());
                            return Promise.resolve(null);
                        }
                    }
                }, (error) => {}
            );
        }
    }, []);

    return (
        hasSelected ?
            <Redirect to={routes.thanks} />
            :
            <Page>
                <div className="cards-wrapper">
                    <div className="container">
                        {hasFetched ? <MainList fetched_ids={fetched_ids} /> : <MainEmpty />}
                    </div>
                </div>
            </Page>
    );
};

export default MainPage;
