package com.marketSim.services;

import com.marketSim.Model.Ship;
import com.marketSim.interfaces.IShipsParser;
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
public class ShipsParser implements IShipsParser {

    @Override
    public List<Ship> parseFile(String filePath){
        List<Ship> ships = new ArrayList<>();

        Resource rsrc = new ClassPathResource(filePath);


        try {
            String adresa = rsrc.getFile().getAbsolutePath();
            File file = new File(adresa);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(file);
            doc.getDocumentElement().normalize();
            List<Ship> parsedShips = parseDocument(doc);
            ships.addAll(parsedShips);
        }
        catch (SAXException | IOException |ParserConfigurationException e ) {
            System.err.println("Nop - parsing commodities");
        }

        return ships;
    }

    private List<Ship> parseDocument(Document doc) {
        List<Ship> ships = new ArrayList<>();
        NodeList nodes = doc.getElementsByTagName(SHIP_NODE);

        for (int i = 0; i < nodes.getLength(); i++) {
            ships.add(parseNode(nodes.item(i)));
        }
        return ships;
    }

    private Ship parseNode(Node item) {
        Element element = (Element) item;

        String name = element.getElementsByTagName(NAME_NODE).item(0).getTextContent();
        Double speed = Double.valueOf(element.getElementsByTagName(SPEED_NODE).item(0).getTextContent());
        Double price = Double.valueOf(element.getElementsByTagName(PRICE_NODE).item(0).getTextContent());
        Double capacity = Double.valueOf(element.getElementsByTagName(CAPACITY_NODE).item(0).getTextContent());

        Ship ship = new Ship();
        ship.setName(name);
        ship.setMaxSpeed(speed);
        ship.setPrice(price);
        ship.setCapacity(capacity);

        return ship;
    }

    private final String SHIP_NODE = "ship";
    private final String NAME_NODE = "name";
    private final String SPEED_NODE = "speed";
    private final String PRICE_NODE = "price";
    private final String CAPACITY_NODE = "capacity";
}
