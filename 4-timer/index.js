const [, , ...args] = process.argv;

function durationToMs(str) {
  const regex = /(\d+)\s*(h|m|s)/gi;
  let totalMs = 0;
  let match;

  while ((match = regex.exec(str)) !== null) {
    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case 'h':
        totalMs += value * 60 * 60 * 1000;
        break;
      case 'm':
        totalMs += value * 60 * 1000;
        break;
      case 's':
        totalMs += value * 1000;
        break;
    }
  }

  return totalMs;
}

setTimeout(() => console.log('таймер прозвонил'), durationToMs(args.join(' ')));
