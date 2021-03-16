---
title: C++ 目录
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2021-03-08 00:35:10
---

<!--more-->

# C++ 历史文化
## C++ 标准
## C++ 联邦

# 面向对象编程
面向对象编程三大特征：
- 封装；
- 继承；
- 多态；  
## 面向对象基础
### 成员属性 和 成员方法
> 普通成员属性 和 成员方法

> 静态成员属性 和 成员方法

> const 成员方法
mutable 关键字

注意：空指针是可以调用类的方法的，但是要求该方法没有使用 this 指针，有两种情况：
- 没有使用 this 指针的成员方法；
- 静态成员方法；

### 访问控制权限
类外/类内

public

protected

private

friend

### 构造/析构函数

### RVO/NRVO返回值优化
- 正常情况的拷贝操作；
- 一次优化的情况；
- 二次由优化的情况；
- 如果关闭掉返回值优化；

## 封装（封装一个类都要考虑哪些内容）
### 抽象
普通/静态成员属性有哪些？普通/静态成员方法有哪些（只声明，不定义）？
哪些

### 构造 / 析构函数
默认构造函数

有参构造函数

转换构造函数
- 隐式转换；
- explicit

拷贝构造函数

需要考虑两点：
- 深拷贝还是浅拷贝；
- 额外添加的小动作是否会破环拷贝构造语义；

经典问题：拷贝构造函数为什么传递引用？
- 无限递归，导致栈溢出；

> default/delete
//移动构造函数

> 赋值运算符重载

> 拷贝赋值运算符
需要考虑几点：
- 与拷贝构造函数的内容有很多相似之处；
- 要特边关注下自己拷贝自己的情况；

//移动赋值运算符

> 最佳实践：三/五法则

- 需要析构函数的类也需要拷贝构造函数和拷贝赋值运算符；
- 需要拷贝构造运算符的类也需要赋值运算符，反之亦然；
- 析构函数不能是删除的；


### 运算符重载（实际上也是接口）
> 运算符重载方式
两种重载方式：
- 类内重载；第一个参数为对象自己
- 类外重载；类外重载，通常需要被声明为友元，但友元不是必须的，可以借助 getter/setter 实现；

不能重载的运算符：
- .:成员引用运算符
- .*:成员指针引用运算符；
- sizeof 运算符；
- :: 作用域运算符；
- ?: 唯一的三目运算符；

只能类内重载的运算符：
- ()函数括号运算符；
- []数组方括号运算符；
- -> 间接引用运算符；
- = 赋值运算符

### 接口
复数除了要封装四则运算，还需要封装求模等操作，getter/setter操作。需要站在使用者的角度去考虑。


## 继承
继承阐述的是一种 “是一个” 关系：派生类对象一定是一个基类对象；狗是动物
类中包括对象成员阐述的是一种 “拥有” 关系：汽车有一个发动机，汽车不是一个发动机；
### 继承方式
继基成员：派声类中继承自基类的成员。

继承方式影响的是继基成员在派声类中的访问控制权限。
- 基类中的公有成员在派生类中的访问控制权限：
  - 公有继承：还是公有；
  - 保护继承：提升为保护；
  - 私有继承：提升为私有；
- 基类中的保护成员在派声类中的访问控制权限；
  - 公有继承：还是保护；
  - 保护继承：还是保护；
  - 私有继承：提升为私有；
- 基类中的私有成员在派声类中的访问属性为不可访问的；

理解以上内容就不难分析出在派声类外能不能对继基成员即行访问了。

> 指向派生类的基类指针
C++ 允许基类的指针/引用指向 派声类对象，但这种情况只适用于公有继承，为什么私有继承/保护继承不行呢？
- 私有继承意味着：派生类不希望（在类外）使用它的对象去访问基类成员；
- 如果私有继承允许基类指针指向派生类对象，那可以通过做弊的手段，先用一个基类指针指向派生类对象，然后用这个基类指针访基类的公有成员，从而达到访问基类成员的目的。这显然与私有继承的初衷是冲突的；
- 为了禁止这种做弊手段，规定在私有继承时，不能使用基类指针/引用指向派生类对象；

### 继承中的构造/析构函数
基类析构函数必须声明为虚析构函数。



继承中的构造/析构函数：
- 派生类会调用基类的构造函数来初始化基类成员属性（如果未显示指定，会调用基类的默认拷贝构造函数）；
- 派生类会调用基类的析构函数来销毁基类成员属性；

构造函数析构函数调用顺序：
- 构造函数：
  - 先调用基类的构造函数，完成基类成员的初始化；
  - 调用对象成员的构造函数（按对象成员的声明顺序依次调用）；
  - 调用派生类的构造函数；
- 析构函数（于构造函数顺序相反）：
  -  先调用派生类的构造函数，完成派生类成员的销毁；
  -  调用对象成员的析构函数（顺序与对象成员的声明顺序相反）；
  -  调用基类的析构函数；

派生类的拷贝构造函数必须显示调用基类的拷贝构造函数，否则会调用默认拷贝构造函数。

赋值运算符中如何对基类的成员属性赋值？
```cpp
#include <iostream>
#include <string>
using namespace std;

class Animal {
public:
	Animal(string name = "mimi") : name(name) {
        cout << "Animal default constructor" << endl;
	}
	Animal &operator=(const Animal &o) {
		name = o.name;
		return *this;
	}
	~Animal() {
		cout << "Animal destructor" << endl;
	}
protected:
	string name;
};

//注意点一
class Cat : private Animal {
public:
	Cat(string name = "Cat") : Animal(name) {
		cout << "Cat default constructor" << endl;
	}
    //逐疫点二 调用基类拷贝构造函数对基类成员初始化。
    //虽然是私有继承，但是在类内，所以可以用基类引用指向该对象
	Cat(const Cat &c) : Animal(c) {
		cout << "Cat copy constructor" << endl;
	}
	Cat &operator=(const Cat &c) {
        //注意点三 调用基类赋值运算符对基类成员赋值
		Animal::operator=(c);
		return *this;
	}
	void say1() {
		cout << "miaomiaomiao, my name is" << name << endl;
	}
	~Cat() {
		cout << "Cat destructor" << endl;
	}
};

int main() {
    //注意点四：string 大小
	cout << sizeof(string) << endl;
	cout << sizeof(Animal) << " " << sizeof(Cat) << endl;

	Cat c;
	Cat a = c;
	a.say1();
	c.say1();
	Cat b("dogdog");
	a = b;
	a.say1();
	
	return 0;
}
```

### 菱形继承

```bash
   A
 /   \
B     C
 \   /
   D
```
D 中会有两个 A 对象；

解决办法：虚继承。
```cpp
#include <iostream>
using namespace std;

class A {
public:
    A() : x(123) {}
	int x;
};

class B : virtual public A {
public:
	void setX(int x) {
		cout << "set X, &x = " << &(this->x) << endl;
		this->x = x;
		return ;
	}
};

class C : virtual public A {
public:
	int getX() {
		cout << "get X, &x = " << &(this->x) << endl;
		return x;
	}
};

class D : public B, public C {};

int main() {
	cout << sizeof(D) << endl;
    D d;
	cout << "&d = " << &d << endl;
	cout << "get X : " << d.getX() << endl;
	d.setX(12345);
	cout << "get X : " << d.getX() << endl;
	
	return 0;
}
```

### 功能类
```cpp
#include <iostream>
using namespace std;

class Uncopyable {
public:
    Uncopyable(const Uncopyable & other) = delete;
};

class A : public Uncopyable {};

class B : public Uncopyable {};

class C : public Uncopyable {};

int main() {
    A a1;
    A a2 = a1;
    return 0;
}
```
## 多态
多态是基于虚函数实现的

### 虚函数
派生类的重写的虚函数前面的 virtual 可写可不写，但写上更好，可以直接看出来这个函数是一个虚函数。
- 虽然 override 覆盖了前面 virtual 的作用，但最好 两者同时写上，因为大多数人快速判断一个函数是否为虚函数还是根据virtual来看的；

> 普通成员函数（非虚函数）跟类走

发现是一个x类对象，在类 x 中找相应函数；（在编译期已经确定了）
```cpp

#include <iostream>
#include <string>
using namespace std;

class Animal {

public:
	Animal(string name) : name(name) {}
	void run() {
		cout << "I dont know how to run" << endl;
	}
private:
	string name;
};

class Cat : public Animal {
public:
	Cat(string name) : Animal(name) {}
	void run() {
		cout << "I can run with four legs" << endl;
	}
};

int main() {
    Cat a("Tom");
	Animal &b = a;
	Animal *c = &a;
	a.run();
	b.run();
	c->run();
	return 0;
}
```
> 虚函数跟对象走（在运行期确定）

override：只起说明作用，没有功能作用，可以让编译器帮我们检查 bug。

```cpp
#include <iostream>
#include <string>
using namespace std;

class Animal {

public:
	Animal(string name) : name(name) {}
	virtual void run() {
		cout << "I dont know how to run" << endl;
	}
private:
	string name;
};

class Cat : public Animal {
public:
	Cat(string name) : Animal(name) {}
	virtual void run() override {
		cout << "I can run with four legs" << endl;
	}
};

int main() {
    Cat a("Tom");
	Animal &b = a;
	Animal *c = &a;
	a.run();
	b.run();
	c->run();
	return 0;
}
```

> final 作用
- 禁止派生类重写该虚函数；
  - 当派生类的行为与基类一致，不再发生变化时，就可以将 虚函数声明为 final。
- 禁止继承该类；
```cpp
#include <iostream>
#include <string>
using namespace std;

class Animal {

public:
	Animal(string name) : name(name) {}
	virtual void run() {
		cout << "I dont know how to run" << endl;
	}
private:
	string name;
};

class Cat : public Animal {
public:
	Cat(string name) : Animal(name) {}
	virtual void run() override final {
		cout << "I can run with four legs" << endl;
	}
};

class People : public Animal {
public:
	People(string name) : Animal(name) {}
	virtual void run() override {
		cout << "I can run with two legs" << endl;
	}
};

class Bat : public Animal {
public:
	Bat(string name) : Animal(name) {};
	virtual void run() override {
		cout << "I can fly" << endl;
	}
};

class Tiger : public Cat{
public:
	Tiger(string name) : Cat(name) {}
};

int main() {
    Cat a("Tom");
	Animal &b = a;
	Animal *c = &a;
	a.run();
	b.run();
	c->run();

    #define N 10
	srand(time(0));
	Animal **zoo = new Animal *[N];
	for(int i = 0; i < N; ++i) {
		switch(rand() % 4) {
			case 0: zoo[i] = new Cat("Cat"); break;
			case 1: zoo[i] = new People("people"); break;
			case 2: zoo[i] = new Bat("Bat"); break;
			case 3: zoo[i] = new Tiger("Tiger"); break;
		}
	}
	for(int i = 0; i < N; ++i) {
		zoo[i]->run();
	}
	return 0;
}
```

### 虚函数实现多态原理
两点变化：
- 虚基类中会多一个虚表指针的成员属性，这个指针存放在每个对象的前8位地址。
- 派生类中会多一个虚表（静态属性？）；

当使用一个指向派生类的基类指针调用函数时：
- 当函数位普通成员函数：直接调用基类成员函数；
- 当函数位虚函数时：先找到虚表指针，然后找到虚表，调用虚表里面的对应函数；

> 对象的前 8 个字节存储的是虚表指针
```cpp
#include <iostream>
using namespace std;

class A {
public:
	A() : x(200) {}
	virtual void say(int x) {
		cout << "this->x" << this->x << endl;
		cout << "Class A say " << x << endl;
	}

	virtual void run() {
		cout << "Class A run" << endl;
	}
	int x;
};

class B : public A {
public:
	B() {x = 300;}
	virtual void say(int x) override {
		cout << "Class B say " << x << endl;
	}
};

class C : public A {
public:
	C() {x = 400;}
	virtual void run() override {
		cout << "Class c run" << endl;
	}
};

#define TEST(a) test(#a, a)
void test(string class_name, A &a) {
	cout << "object " << class_name << endl;
	a.say(123456);
	a.run();
	cout << "========" << endl << endl;
}

typedef void (*func)(void *, int);

int main() {
    A a;
	B b;
	C c;
	TEST(a);
	TEST(b);
	TEST(c);

    ((void **)&b)[0] = ((void **)&c)[0];
    TEST(b);

	return 0;
}
```

> 成员函数隐藏了第一个参数 this 指针

```cpp
#include <iostream>
using namespace std;

class A {
public:
	A() : x(200) {}
	virtual void say(int x) {
		cout << "this->x" << this->x << endl;
		cout << "Class A say " << x << endl;
	}

	virtual void run() {
		cout << "Class A run" << endl;
	}
	int x;
};

class B : public A {
public:
	B() {x = 300;}
	virtual void say(int x) override {
		cout << "Class B say " << x << endl;
	}
};

class C : public A {
public:
	C() {x = 400;}
	virtual void run() override {
		cout << "Class c run" << endl;
	}
};

#define TEST(a) test(#a, a)
void test(string class_name, A &a) {
	cout << "object " << class_name << endl;
	a.say(123456);
	a.run();
	cout << "========" << endl << endl;
}

typedef void (*func)(void *, int);

int main() {
    A a;
	B b;
	C c;
	TEST(a);
	TEST(b);
	TEST(c);

    ((void **)&b)[0] = ((void **)&c)[0];
    TEST(b);

	((func **)&b)[0][0](&b, 678);

	func x = ((func **)&b)[0][0];
	x(&c, 789);

	return 0;
}
```

> 成员方法指针/成员属性指针

```cpp
#include <iostream>
using namespace std;

class A {
public:
	A() : x(200) {}
	virtual void say(int x) {
		cout << "this->x" << this->x << endl;
		cout << "Class A say " << x << endl;
	}

	virtual void run() {
		cout << "Class A run" << endl;
	}
	int x;
};

class B : public A {
public:
	B() {x = 300;}
	virtual void say(int x) override {
		cout << "Class B say " << x << endl;
	}
};

class C : public A {
public:
	C() {x = 400;}
	virtual void run() override {
		cout << "Class c run" << endl;
	}
};

#define TEST(a) test(#a, a)
void test(string class_name, A &a) {
	cout << "object " << class_name << endl;
	a.say(123456);
	a.run();
	cout << "========" << endl << endl;
}

typedef void (*func)(void *, int);

int main() {
    A a;
	B b;
	C c;
	TEST(a);
	TEST(b);
	TEST(c);

    ((void **)&b)[0] = ((void **)&c)[0];
    TEST(b);

	((func **)&b)[0][0](&b, 678);

	func x = ((func **)&b)[0][0];的
	x(&c, 789);

	void (A::*p)(int);
	p = &A::say;
	(a.*p)(999);

	return 0;
}
```

```cpp

#include <iostream>
using namespace std;

class A {
public:
	A() : x(200) {}
	virtual void say(int x) {
		cout << "this->x" << this->x << endl;
		cout << "Class A say " << x << endl;
	}

	virtual void run() {
		cout << "Class A run" << endl;
	}
	int x;
	void reg1() {
		cout << "reg1 function" << endl;
	}
	void reg2() {
		cout << "reg2 function" << endl;
	}
	void reg3() {
		cout << "reg3 function" << endl;
	}
	void reg4() {
		cout << "reg4 function" << endl;
	}
	void reg5() {
		cout << "reg5 function" << endl;
	}
};

class B : public A {
public:
	B() {x = 300;}
	virtual void say(int x) override {
		cout << "Class B say " << x << endl;
	}
};

class C : public A {
public:
	C() {x = 400;}
	virtual void run() override {
		cout << "Class c run" << endl;
	}
};

#define TEST(a) test(#a, a)
void test(string class_name, A &a) {
	cout << "object " << class_name << endl;
	a.say(123456);
	a.run();
	cout << "========" << endl << endl;
}

typedef void (*func)(void *, int);

int main() {
    A a;
	B b;
	C c;
	TEST(a);
	TEST(b);
	TEST(c);

    ((void **)&b)[0] = ((void **)&c)[0];
    TEST(b);

	((func **)&b)[0][0](&b, 678);

	func x = ((func **)&b)[0][0];
	x(&c, 789);

	void (A::*p)(int);
	p = &A::say;
	(a.*p)(999);

	void (A::*r[5])();
	r[0] = &A::reg1;
	r[1] = &A::reg2;
	r[2] = &A::reg3;
	r[3] = &A::reg4;
	r[4] = &A::reg5;
	for(int i = 0; i < 10; ++i) {
		(a.*r[rand() % 5])();
	}

	return 0;
}
```
### dynamic_cast
dynamic_cast: 运行期才能实现的行为，它是基于虚表实现的；

```cpp
#include <iostream>
#include <memory>
using namespace std;


class A {
public:
    virtual void say() {
		cout << "Class A" << endl;
	}
};

class B : public A {
public:
    virtual void say() override {
		cout << "Class B" << endl;
	}
};

class C : public A{
public:
	virtual void say() override {
		cout << "Class C" << endl;
	}
};
int main() {
    A *p;
	srand(time(0));
	switch(rand() % 2) {
		case 0: p = new B(); break;
		case 1: p = new C(); break;
	}
     //将基类地址转换位派生类地址
    //如果能对应上则转换成功；
    //否杂转换失败，结果为nullptr；
	cout << dynamic_cast<B *>(p) << endl;
	cout << dynamic_cast<C *>(p) << endl;

	return 0;
}
```
> 验证 hsared_ptr 是基于虚表实现的。
```cpp
#include <iostream>
#include <memory>
using namespace std;


class A {
public:
    virtual void say() {
		cout << "Class A" << endl;
	}
};

class B : public A {
public:
    virtual void say() override {
		cout << "Class B" << endl;
	}
};

class C : public A{
public:
	virtual void say() override {
		cout << "Class C" << endl;
	}
};
int main() {
    A *p;
	srand(time(0));
	switch(rand() % 2) {
		case 0: p = new B(); break;
		case 1: p = new C(); break;
	}

    //改虚表之前，是这可正常转换的
	cout << dynamic_cast<B *>(p) << endl;
	cout << dynamic_cast<C *>(p) << endl;

    //修改虚表指针
    ((void **)p)[0] = nullptr;
    
    //段吐核，转换失败
    //说明就是根据虚表指针来工作的
    cout << dynamic_cast<B *>(p) << endl;
	cout << dynamic_cast<C *>(p) << endl;

	return 0;
}

```
为啥会 segmentfault ？ 以下为一种猜测：
```cpp
cout << dynamic_cast<B *>(p) << endl;
```
对于上述代码，
- 只需要比较一下 p 的虚表指针是不是指向（等于） B类的虚表，不就可以判断 p 能不能转换成 B 类的指针？
- 这不就是判断两个指针是否相等嘛，怎么会 segment fault？
- 猜想：上述的思路并不完善。可能是，它先会用 p 的虚表指针去判断 这个虚表指针是否是有效的（p指向的对象的类型到底是什么），如果是有效的，才会去判断是否跟 B 类的虚表判断是否相等。
- 而在判断 p 的虚表指针是否有效时，导致的 segment fault。
### 虚析构函数
具有继承关系的类中，析构函数一定要设置为虚函数。


### 纯虚函数
> 封装两种优先队列
```cpp
#include <iostream>
#include <vector>
#include <ctime>
#include <algorithm>
using namespace std;

class IQueue {
public:
	virtual void push(int x) = 0;
	virtual void pop() = 0;
	virtual bool empty() = 0;
	virtual int top() = 0;
	virtual int size() = 0;
};

class vector_queue : public IQueue {
public:
    virtual void push(int x) override {
        nums.push_back(x);
	    for(int i = nums.size() - 2; i >= 0 && nums[i] > nums[i + 1]; --i) {
			swap(nums[i], nums[i + 1]);
		}	
	} 

    virtual void pop() override {
		nums.pop_back();
	}
	virtual bool empty() override {
		return nums.empty();
	}
	virtual int top() override {
		return nums.back();
	}
	virtual int size() override {
		return nums.size();
	}
private:
	vector<int> nums;
};

class heap_queue : public IQueue {
public:
    virtual void push(int x) override {
		nums.push_back(x);
		push_heap(nums.begin(), nums.end(), cmp);
	} 
    virtual void pop() override {
	    pop_heap(nums.begin(), nums.end(), cmp);
		nums.pop_back();
	}
	virtual bool empty() override {
		return nums.empty();
	}
	virtual int top() override {
		return nums.front();
	}
	virtual int size() override {
		return nums.size();
	}
private:
	vector<int> nums;
	less<int> cmp;
};
int main() {
    const int N = 10;
	srand(time(0));
	vector_queue vq;
	heap_queue hq;
    for(int i = 0; i < N; ++i) {
        int temp = rand() % 100;
		vq.push(temp);
		hq.push(temp);
	}
	while(!vq.empty()) {
		cout << vq.top() << " ";
		vq.pop();
	}
	cout << endl;

	while(!hq.empty()) {
		cout << hq.top() << " ";
		hq.pop();
	}
	cout << endl;
	return 0;
}
```

抽象类：包含纯虚函数（接口）的类，称为抽象类。
- 抽象类是无法进行实例化的；
- 不实现纯虚函数的派生类，仍然是抽象类；


## 思考
为什么 static 成员函数 不能声明为 virtual ？
- static 没有 this 指针，更也就没有 虚表指针了。

重载/重写/覆盖
- 重载：两个函数在同一作用域内，函数名相同，参数列表不同；
- 重写：两个函数必须为虚函数，一个在基类中另一个在派声类，要求函数名和参数列表完全一致；
- 覆盖：两个函数一个在基类中另一个在派生类中，只要求函数名相同，是不是虚函数无所谓（不构成重写的都是覆盖）；

# 其它

## auto
typeid(x).name()

不能使用 auto：
- 函数参数；
- 数组；
- 类成员声明；

## const / constexpr

constexpr: 当前常量的值在编译期就能确定其值到底是什么；
const: 可以在运行期的时候才确定常量的值；

## NULL / nullptr

NULL 就是地址 0；

## 左/右值
常见的右值：
- 字面量；123
- 临时变量；x + y、c + 123、x++

# 函数式编程
## lamdba 表达式

# 泛型编程

模板文件必须写在头文件中

cout << add<double>(1, 2.5) << endl;

nm -C

decltype 前置

尾置返回。

auto

## 引用推导

## 模板偏特化

## 模板特化

## 类模板的便特化

## 函数模板的偏特化

