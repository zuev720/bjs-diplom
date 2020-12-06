"use strict";

const userLogout = new LogoutButton();

userLogout.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        }
    });
};


ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard();


function getRatesBoard() {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getRatesBoard();

setInterval(getRatesBoard, 60000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Счёт успешно пополнен');
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Валюта успешно конвертирована');
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод успешно выполнен!');
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success === true) {
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен в избранное!');
        }
        else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success === true) {
            favoritesWidget.setMessage(response.success, 'Пользователь  успешно удален!');
        }
        else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}
