
const getTableData = (req, res, db) => {
    db.select('*').from('afaires')
      .then(items => {
        if(items.length) { res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      }).catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
    const { todo, opis, fini } = req.body
    const added = new Date()
    db('afaires').insert({todo, opis, fini, added}).returning('*')
      .then(item => { res.json(item) }
      ).catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
    const { id, todo, opis, fini } = req.body
    db('afaires').where({id}).update({todo, opis, fini}).returning('*')
      .then(item => { res.json(item) }
      ).catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('afaires').where({id}).del()
      .then(() => { res.json({delete: 'true'}) }
      ).catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = { getTableData, postTableData, putTableData, deleteTableData }
