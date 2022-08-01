const logoutButton = new LogoutButton();
logoutButton.action = () => {
        ApiConnector.logout((response)=>{
        console.log(response);
        if (response.success) {
            document.location.reload();
        }
    });
}

ApiConnector.current((response)=>{
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    });

const ratesBoard = new RatesBoard();

const getValue = () => {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data)
        }
    });
}

getValue();

setInterval(getValue, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (!response.success) {
            return moneyManager.setMessage(response.success, response.error);
        } 
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "успех");        
    });
}
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (!response.success) {
            return moneyManager.setMessage(response.success, response.error);
        } 
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "успех");
    });
}
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (!response.success) {
            return moneyManager.setMessage(response.success, response.error);
        } 
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "успех");
    });
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (!response.success) {
            return favoritesWidget.setMessage(response.success, response.error);
        }    
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "успех");        
    }); 
}
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (!response.success) {
            return favoritesWidget.setMessage(response.success, response.error);
        }    
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "успех");      
    });
}
    