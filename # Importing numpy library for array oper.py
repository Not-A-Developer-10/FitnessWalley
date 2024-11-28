class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Stack:
    def __init__(self):
        self.head = None

    def is_empty(self):
        return self.head is None

    def push(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            new_node.next = self.head
            self.head = new_node

    def pop(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        else:
            popped = self.head.data
            self.head = self.head.next
            return popped

    def display(self):
        if self.is_empty():
            print("Stack is empty")
        else:
            current = self.head
            print("Stack elements:")
            while current:
                print(current.data)
                current = current.next

# Function to demonstrate stack operations
def perform_operations(stack):
    while True:
        print("\nSelect an operation:")
        print("1. Push")
        print("2. Pop")
        print("3. Display")
        print("4. Exit")
        choice = input("Enter your choice (1-4): ")

        if choice == '1':
            element = input("Enter element to push: ")
            stack.push(element)
            print(f"'{element}' pushed to the stack.")
        elif choice == '2':
            popped_element = stack.pop()
            if popped_element is not None:
                print(f"Popped element: {popped_element}")
        elif choice == '3':
            stack.display()
        elif choice == '4':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please enter a valid option.")

if __name__ == "__main__":
    # Create an empty stack
    stack = Stack()

    # Perform stack operations
    perform_operations(stack)
