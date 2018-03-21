# Hexagon Architecture Pattern

[Source](http://java-design-patterns.com/blog/build-maintainable-systems-with-hexagonal-architecture/)

It all starts with a layered architecture. There are mainly 3 layers of abstractions:

* presentation layer: the presentation layer deals with user input
* business logic layer: the business layer is responsible for business logic
* data layer: the database layer takes care of data transactions

The layered architecture implements so called separation of concerns principle which leads to more maintainable code. The main point of this pattern is to avoid leaking the business logic into other layers of abstraction. If it happens there is no way for "headless" testing. 

## Core, ports and adapters

The main objective is to create a full testable system that can be driven equally by users, programs, and batch scripts in isolation of database.

There is a core. Something has to drive this application, call the business logic methods. It may be the HTTP request, automatic test or integration API. These interfaces that drive the application we call the primary ports and the modules that use them are primary adapters. 

The core has it's dependencies. For example they may be a data storage module that the core calls upon to retrieve and update data. The interfaces of these modules that are driven by the core are called the secondary ports of the application. There could be one or more implementations of the secondary port. For example there may be a mock database for testing and a real database for running the application. The secondary port implementations are called secondary adapters.

![Hexagon Pattern](http://java-design-patterns.com/assets/ports_and_adapters.png)


* core: is the main business logic
* primary ports: something that drives the logic or calls the methods e.g. http request, automatic test
* adapters: modules that use the primary adapters
* secondary ports: dependencies that are driven from the application such as retrieve/store data are secondary ports 
* secondary adapters: is the implementation of the secondary ports

## Example: Lottery System

The lottery system will provide two main primary ports: One for the user to submit lottery tickets and another for system admisitrator to perform the draw

The secondary ports consist of lottery ticket database, banking for wire and event log for handling and storing lottery events. 

![Example Hexagon](http://java-design-patterns.com/assets/lottery.png)

### 1. Start from the core concepts

We start the implementation from the system core. First we need to identify the core concepts of the lottery system. Probably the most important one is the lottery ticket. In a lottery ticket you are supposed to pick the numbers and provide your contact details. 

The `LotteryTicket` class contains `LotteryNumbers` and `PlayerDetails`. `LotteryNumbers` contains means to hold given numbers or generate random numbers and test the numbers for equality  with other `LotteryNumbers` instance. `PlayerDetails` is a simple value object containing player's email adress, bank account number and phone number. 

### 2. The core business logic

We have the core concepts and now we need to implement the core business logic that defines how the syste works. In `LotteryAdministration` and `LotteryService` classes we write the methods that are needed by the lottery players and system administrators. 

For Adimistrators the `LotteryAdministration` has `resetLottery()` method for starting a new lottery round. At this stage the player submit their lottery tickets into the database and when the time is due the adimistrator calls `performLottery()` to draw the winning numbers and check each of the tickets for winnings. 

The lottery players use `submitTicket()` to submit tickets for lottery round. After the draw has been performed `checkTicketForPrize()` tells the players whether they have won. 

`LotteryAdministartion` and `LotteryService` have dependencies to lottery ticket database, banking and event log ports. 

### 3. Primary adapter for the players

The core implementation is ready, now we need to define primary adapters for the players. We introduce `ConsoleLottery` class to provide command line interface that allows players to interact with the lottery system.

It has the commands to view and transfer bank account funds, submit and check lottery tickets.

### 4. Primary adapter for adimistrators

We need also to define the lottery administrator facing adapter. This is another command line interface named `ConsoleAdministration`.

The interface's commands allow us to view submitted tickets, perform the lottery draw and reset the lottery ticket database. 

### 5. Secondary port for banking

Next we implement secondary ports and adapters. The first one is the banking support that enables us to manipulate bank account funds. To explain the concept, the player can write his bank account number on the lottery ticket and in case the ticket wins the lottery system automatically wire transfers the funds.

The banking port has two adapters for different purposes. The first one `InMemoryBank` is a simple `HashMap` based implementation for testing. The lottery service's bank account is statically initialized to contain enough funds to pay the prizes in case some of the lottery tickets win.

The other adapter `MongoBank` is based on Mongo and is intended for production use. Running either one of the command line interfaces use this adapter.

### 6. Secondary port for event log

Another secondary port is the lottery event log. Events are sent as the players submit their lottery tickets and when the draw is performed.

We have two adapters for this port: The first one `StdOutEventLog` is for testing and simply sends the events to standard output. The second `MongoEventLog` is more sophisticated, has persistent storage and is based on Mongo.

### 7. Secondary port for database

The last secondary port is the database. It contains methods for storing and retrieving lottery tickets. The port has two adapters. The `LotteryTicketInMemoryRepository` is a mock database holding its contents in memory only and is meant for testing. The `MongoTicketRepository` is used for production runs and provides persistent storage over application restarts.

### 8. Lottery application

With all the pieces in place we create a command line application to drive the lottery system. The test application begins the lottery round using the administration methods and starts collecting lottery tickets from the players. Once all the lottery tickets have been submitted the lottery number draw is performed and all the submitted tickets are checked for wins.

```java
public class App {

  /**
   * Program entry point
   */
  public static void main(String[] args) {

    Injector injector = Guice.createInjector(new LotteryTestingModule());

    // start new lottery round
    LotteryAdministration administartion = injector.getInstance(LotteryAdministration.class);
    administartion.resetLottery();
    
    // submit some lottery tickets
    LotteryService service = injector.getInstance(LotteryService.class);
    SampleData.submitTickets(service, 20);
    
    // perform lottery
    administartion.performLottery();
  }
}
``` 

---

[DESIGNING TESTABLE LAMBDA FUNCTIONS](https://claudiajs.com/tutorials/designing-testable-lambdas.html)



