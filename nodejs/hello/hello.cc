#include <node.h>
#include <V8.h>

useing namespace v8

Handle<Value> SyaHello(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("Hello World"));
}

void Init_Hello(Handle<Object> exports) {
  exports->Set(String::NewSymbol("hello"),
      FunctionTemplate::New(SyaHello)->GetFunction());
}

NODE_MODULE(hello, Init_Hello)