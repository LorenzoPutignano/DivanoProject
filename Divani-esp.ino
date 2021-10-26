#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>

const char* ssid = "****";
const char* password = "****";
WebSocketsServer webSocket = WebSocketsServer(81);

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  
  switch(type) {

    case WStype_DISCONNECTED:
      //Serial.printf("[%u] Disconnected!\n", num);
    break;

    case WStype_CONNECTED: {
      IPAddress ip = webSocket.remoteIP(num);
      //Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
      webSocket.sendTXT(num, "Connected");
      String d_string = "{\"speed\": ";
      d_string += "}";
      uint8_t dataArray[d_string.length()+1];
      d_string.getBytes(dataArray, d_string.length()+1);
      webSocket.sendTXT(num, dataArray);  
    }
    break;
    
    case WStype_TEXT: {
      Serial.printf("[%u] get Text: %s\n", num, payload);
      String msg((char*)payload);
      if (msg == "command|SchienaleUP_on#") {
        digitalWrite(2,HIGH);
        Serial.println("command recived");
   
      } else if (msg == "command|SchienaleUP_off#") {
        digitalWrite(2,LOW);
        Serial.println("command recived");
      }
      if (msg == "command|SchienaleDOWN_on#") {
        digitalWrite(0,HIGH);
        Serial.println("command recived");
      } else if (msg == "command|SchienaleDOWN_off#") {
        digitalWrite(0,LOW);
        Serial.println("command recived");
      }
      if (msg == "command|PoggiapiediUP_on#") {
        digitalWrite(16,HIGH);
       
      } else if (msg == "command|PoggiapiediUP_off#") {
        digitalWrite(16,LOW);
        Serial.println("command recived");
      }
      if (msg == "command|PoggiapiediDOWN_on#") {
        digitalWrite(5,HIGH);
        Serial.println("command recived");
      } else if (msg == "command|PoggiapiediDOWN_off#") {
        digitalWrite(5,LOW);
        Serial.println("command recived");
    }
    }
    break;
  }
}

void wifi_connection() {
  WiFi.begin(ssid, password);
  for (int i = 0; i < 15 && WiFi.status() != WL_CONNECTED; i++) {
      Serial.print(".");
      delay(1000);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(9600);
  wifi_connection();
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
  pinMode(16, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(0, OUTPUT);
  pinMode(2, OUTPUT);
}

void loop() {
  webSocket.loop(); 
}
