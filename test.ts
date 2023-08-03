// @ts-nocheck
function Curd(options: any) {
  return <T extends Test>(target: any) => {
    const types = Reflect.getMetadata(
      'design:paramtypes',
      target.prototype,
      'say',
    )
    console.log(types) // 输出 say 方法的参数类型信息
    return target
  }
}
@Curd({
  a: 'test',
})
class Test {
  public a: number
  public b: string
  constructor(a: number, b: string) {
    this.a = a
    this.b = b
  }
  say(name: string, age: string) {
    console.log('say,hello', name, age)
    return 1
  }
}
