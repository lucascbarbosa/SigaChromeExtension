function clickSave() {
    var xpath = "//*[@class='l4V7wb Fxmcue']//span[contains(text(), 'Salvar')]";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    matchingElement.click();
}

clickSave();
