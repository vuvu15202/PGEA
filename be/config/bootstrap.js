/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hooks.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */
const path = require('path');
module.exports.bootstrap = async function (done) {
  // Install the required package first
  sails.services = require('include-all')({
    dirname: path.resolve('api/services'),
    filter: /(.+Service)\.js$/,
    excludeDirs: /^\.(git|svn)$/
  });

  // if (process.env.NODE_ENV !== 'production' && sails.config.port == 1337 && sails.config.models.migrate == 'drop') {
  //   try {
  //     try {
  //       let sql = 'create unique index auth_key_type_uindex on auth (`key`, type);'
  //       await sails.sendNativeQuery(sql);
  //       let sql2 = 'create unique index api_actionPath_apiVersion_method_uindex on api (actionPath, apiVersion, method)'
  //       await sails.sendNativeQuery(sql2);
  //     } catch (error) {
  //       console.log(String(error));
  //     }
  //     await initDatabase();
  //   } catch (error) {
  //     console.log((error));
  //   }
  // }
  
  await cache.refreshCache();
  console.log(sails.config.globals.BASE_URL);
  setTimeout(() => {
    console.log(sails.config.globals.BASE_URL);
  }, 1000);
  await bootstrapAllControllers();
  common.hookPrototype();
  let NUM_OF_INSTANCE = (+process.env.NUM_OF_INSTANCE || 1);
  let instanceNo = await redis.increase('obt_' + (process.env.NODE_ENV || 'development') + "_instance_no");
  console.log(instanceNo);
  if (process.env.MODE === 'BACKJOB' && (instanceNo % NUM_OF_INSTANCE == 1 || NUM_OF_INSTANCE == 1)) {
    process.env.UV_THREADPOOL_SIZE = 128;
    backjob.initialize();
    backjob.run();
  }
  if (instanceNo >= NUM_OF_INSTANCE) {
    await redis.set('obt_' + (process.env.NODE_ENV || 'development') + "_instance_no", 0);
  }

  //DO job internal ap

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};


let bootstrapAllControllers = async () => {
  let promises = [];
  for (var index in sails.models) {
    let model = sails.models[index];
    if (model.bootstrap) {
      promises.push(model.bootstrap());
    }
  }
  await Promise.all(promises);
}



async function initDatabase() {
  const folder = path.join(__dirname, '../init');
  const files = fs.readdirSync(folder);

  for (const file of files) {
    if (path.extname(file) === '.sql') {
      try {
        const sqlContent = fs.readFileSync(path.join(folder, file), 'utf8');

        const sqlStatements = sqlContent.split(/;(?!.*\S)/);

        // Execute each statement
        for (const statement of sqlStatements) {
          const trimmedStatement = statement.trim();

          if (trimmedStatement.toUpperCase().startsWith('INSERT')) {
            await sails.sendNativeQuery(trimmedStatement);
          }
        }
      } catch (err) {
        console.log(`Error executing ${file}:`, err);
      }
    }
  }
}

// async function createJsonFile() {
//   // Đường dẫn đến thư mục 'init'
//   const dirPath = path.join(__dirname, '../init');

//   // Tên file JSON sẽ được tạo
//   const filePath = path.join(dirPath, 'config.json');

//   // Nội dung của file JSON
//   const jsonContent = {
//     "name": "example",
//     "version": "1.0.0",
//     "description": "This is an example JSON file"
//   };

//   // Chuyển đổi nội dung JSON thành chuỗi
//   const jsonString = JSON.stringify(jsonContent, null, 2);

//   // Tạo file JSON trong thư mục 'init'
//   return new Promise((resolve, reject) => {
//     fs.writeFile(filePath, jsonString, (err) => {
//       if (err) {
//         console.error('Lỗi khi tạo file JSON:', err);
//         return reject(err);
//       }
//       console.log('File JSON đã được tạo thành công tại:', filePath);
//       resolve();
//     });
//   });
// }