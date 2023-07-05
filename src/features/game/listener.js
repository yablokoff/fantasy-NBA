import difference from 'lodash/difference';
import { getShuffledList } from '../../utils';
import { CARDS_SHOW_COUNT } from '../../constants/defaults';
import { dailyPlayersApi as api } from '../../app/services/daily';
import listenerMiddleware from '../../app/listenerMiddleware';
import { selectDailyPlayersIds, resetGame, setupGame } from './gameSlice';

// вычисляю флаг актив дейли плееров по дате старта-окончания игры,
// делаю запрос по ним. если приходят, значит есть активный евент (есть список дейли плееров)

// далее надо проверять, что если нет дейли плееров вообще, значит это gameNotStarted,
// надо инвалидейтить, чистим локально дейли плееров
// если в пришедших дейли плееров нет тех что я заперсистил после шафла, значит это isNewGame,
// надо сетать новый шафл,
// иначе идет текущая игра, можно показывать борд или, если есть, сразу пикнутый результат

// чтобы не запоминать выбор юзера, нужна агрегация на пикнутые карты юзера, по активным дейли плеерам
// это много работы с таблицами

const setupGameListener = (action, { cancelActiveListeners, dispatch, getState }) => {
    // Cancel any in-progress instances of this listener
    cancelActiveListeners();

    const state = getState();
    const list = action.payload;
    const gameNotStarted = !list.length;

    if (gameNotStarted) {
        dispatch(resetGame());
        return;
    }

    const localDailyPlayersIds = selectDailyPlayersIds(state); // from browser local storage
    const activeDailyPlayersIds = list.map(pd => pd.id);
    const isNewGame = Boolean(difference(localDailyPlayersIds, activeDailyPlayersIds).length);
    const isGameActive = Boolean(localDailyPlayersIds.length);

    if (!isGameActive || isNewGame) {
        const shuffledList = getShuffledList(list.slice(), CARDS_SHOW_COUNT);
        const data = {
            dailyPlayersIds: shuffledList.map(pd => pd.id),
            boardCardIds: shuffledList.map(pd => pd.cardId),
        };

        dispatch(setupGame(data));
    }
};

listenerMiddleware.startListening({
    matcher: api.endpoints.dailyPlayersList.matchFulfilled,
    effect: setupGameListener,
});
