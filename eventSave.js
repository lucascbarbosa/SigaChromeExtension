
function clickSave() {
    console.log("acessei o site");
    var xpath = "//*[@class='l4V7wb Fxmcue']//span[contains(text(), 'Salvar')]";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    matchingElement.click();
    
}
