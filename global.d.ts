declare global {
  type ElementOfArray<T extends any[]> = T extends (infer U)[] ? U : never
}

declare module '@store/*'

export {}
