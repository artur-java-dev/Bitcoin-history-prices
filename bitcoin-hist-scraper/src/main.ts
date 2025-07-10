import { appService } from './service'


const from = '01-01-2024'
// const to = '31-12-2024'


main()


async function main() {
  await appService.init()
  await appService.run(from)
}
