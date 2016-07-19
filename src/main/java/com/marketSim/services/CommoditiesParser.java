package com.marketSim.services;

import com.marketSim.Model.Commodity;
import com.marketSim.interfaces.ICommoditiesParser;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Component
public class CommoditiesParser implements ICommoditiesParser {

    @Override
    public List<Commodity> parseFile(String path) {

        List<Commodity> commodities = new ArrayList<>();

        Resource rsrc = new ClassPathResource(path);


        try {
            String adresa = rsrc.getFile().getAbsolutePath();
            File fXmlFile = new File(adresa);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(fXmlFile);
            doc.getDocumentElement().normalize();
            List<Commodity> parsedCommodities = parseDocument(doc);
            commodities.addAll(parsedCommodities);
        }
        catch (SAXException | IOException  |ParserConfigurationException e ) {
            System.err.println("Nop - parsing commodities");
        }

        return commodities;
    }

    private List<Commodity> parseDocument(Document doc) {
        List<Commodity> commodities = new ArrayList<>();
        NodeList nodes = doc.getElementsByTagName(COMMODITY_NODE);

        for (int i = 0; i < nodes.getLength(); i++) {
            commodities.add(parseNode(nodes.item(i)));
        }
        return commodities;
    }

    private Commodity parseNode(Node item) {
        Element element = (Element) item;

        String name = element.getElementsByTagName(NAME_NODE).item(0).getTextContent();

        double production;
        try {
            production = Double.parseDouble(element.getElementsByTagName(PRODUCTION_NODE).item(0).getTextContent());
        } catch (NumberFormatException e) {
            production = 0;
        }

        double price;
        try {
            price = Double.parseDouble(element.getElementsByTagName(PRICE_NODE).item(0).getTextContent());
        }catch (NumberFormatException e) {
            price = 0;
        }

        double volumeCoefficient;
        try {
            volumeCoefficient = Double.parseDouble(element.getElementsByTagName(VOLUME_COEF_NODE).item(0).getTextContent());
        }catch (NumberFormatException e) {
            volumeCoefficient = 0;
        }

        Commodity commodity = new Commodity();
        commodity.setName(name);
        commodity.setDefaultPrice(price);
        commodity.setQuantity(production);
        commodity.setVolumeCoefficient(volumeCoefficient);
        return commodity;
    }

    private final String COMMODITY_NODE = "commodity";
    private final String NAME_NODE = "name";
    private final String PRODUCTION_NODE = "production";
    private final String PRICE_NODE = "price";
    private final String VOLUME_COEF_NODE = "volumeCoefficient";

}
