import figlet from 'figlet';

const logo = new Promise<string>(resolve => figlet.text('TECHR', {
  font: 'Graffiti',
  horizontalLayout: 'default',
  verticalLayout: 'default',
}, (_, data) => resolve(data as string)));

export default logo;
