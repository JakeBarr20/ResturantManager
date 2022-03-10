from operator import truediv


class Order:
    def __init__(self, tableNumber, orderItems, orderPrice):
        self.tableNumber=tableNumber
        self.order=orderItems
        self.orderPrice=orderPrice

    def addFoodItem(self, foodItem, foodItemPrice):
        self.order.append(foodItem)
        self.orderPrice+=foodItemPrice

    def removeFoodItem(self, foodItem, foodItemPrice):
        if foodItem in self.order: self.order.remove(foodItem)
        self.orderPrice-=foodItemPrice

class AllOrders:
    def __init__(self, orderList):
        self.orderList=orderList
    
    def addOrder(self, order):
        self.orderList.append(order)
    
    def removeOrder(self, order):
        if order in self.orderList: self.order.remove(order)
    
    def exists(self, orderNumber):
        for x in self.orderList:
            if x.tableNumber==orderNumber :
                return True
            else:
                return False
            