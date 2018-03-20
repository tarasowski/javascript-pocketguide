# Queue

My notes from the lecture

Queues are data structures that can have different methods. They work according to FIFO and have put() and get() methods usually. The method names can be different. Something goes into the queue on top and the last element gets removed consumed. If a service (A) goes down the queue just gets filled with the data and if service (A) is available again it starts to consume the data from the queue. In general by using queues you can build fault-tolerant systems.